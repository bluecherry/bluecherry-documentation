# Firmware Over-the-Air updates

The BlueCherry platform has extensive support for FOTA (Firmware Over The Air) updates for both 
*full* and *lite* devices. The format of an OTA update depends on the type of device and deployment
target, but that's transparent to the platform.

## Creating an update

To publish a new OTA update, a manufacturer uploads the firmware binary together with a set of
parameters describing it:

```
POST /api/v1/ota-updates
Content-Type: multipart/form-data

deviceType:      "abcd1234"         // The BlueCherry device type that this update targets.
version:         10                 // An OTA version in BlueCherry is always a single integer.
binary:          <file>             // The firmware image itself
active:          true               // Wether this OTA update should be deployed or not
couplingNeeded:  false              // See "Coupling requirement" below
description:     "your description" // Free to choose description, typically a software version number
```

On success, the platform returns a record describing the newly created update:

```json
{
  "id": "8f2c1e0a-...",
  "deviceType": "abcd1234",
  "version": 10,
  "active": true,
  "couplingNeeded": false,
  "description": "your description",
  "createdAt": "2026-07-08T09:12:00Z"
}
```

### Parameters

| Field            | Type    | Required             | Description                                                                   |
|------------------|---------|----------------------|-------------------------------------------------------------------------------|
| `deviceType`     | string  | yes                  | The product/device type this build is intended for.                           |
| `version`        | int     | yes                  | Version identifier for the build, should always be an integer                 |
| `binary`         | file    | yes                  | The firmware image to publish.                                                |
| `active`         | boolean | no (default `false`) | Whether the update is currently eligible to be offered.                       |
| `couplingNeeded` | boolean | no (default `true`)  | Marks this version as a mandatory stepping stone that cannot be skipped       |
| `description`    | string  | no                   | Free to choose text, for example software version number                      |

## Update lifecycle

Once created, an update record supports the standard management operations:

- **List / search** — retrieve all updates, optionally filtered by device type, version, or active status.
- **Update metadata** — change `description`, `active`, or `couplingNeeded` without touching the binary.
- **Deactivate** — set `active` to `false` to stop offering an update while keeping its history and metadata.

An update cannot be deleted once it has been deployed as there is a chance that devices have started downloading it.

```
PUT /api/v1/ota-updates/{id}
{
  "active": false
}
```

## Coupled (non-skippable) updates

By default, a device that is several versions behind jumps straight to the newest eligible update. 
Some builds, however, depend on an intermediate version having been installed first, for example
when a release performs a data migration or changes the update format itself. Flagging such a
version with `couplingNeeded: true` makes it non-skippable:

- When a device checks for updates, the platform looks at all versions between the device's current
  version and the newest eligible one.
- If any of those versions is coupled, the device is offered the **oldest coupled version first**, 
  rather than the latest build.
- After installing it, the device checks again and repeats the process, stepping through every
  coupled version in order until it reaches the newest release.

Versions without the flag are simply skipped over on the way to the latest build. Use 
`couplingNeeded: false` for self-contained releases, and keep the flag set for releases that later
versions depend on.

## Rollout control

Publishing an update doesn't push it to every device automatically.
Administrators can constrain which devices are even eligible to be offered a
given update by capping the maximum firmware version a device (or group of
devices) may advance to. This makes staged rollouts possible: raise the
ceiling for a small batch of devices first, confirm the update behaves as
expected, then raise it for the rest of the fleet.

## Rolling back an update

When a published update turns out to be faulty, the platform rolls it back by publishing the older,
known-good firmware again as a **new update with a higher version number**, devices never
"downgrade" in version terms, even though they end up running the older build.

This approach has an important observability advantage: the reported version number tells you
exactly what happened to each device. A rollback build typically includes an installation guard that
skips the installation when the firmware it contains is already the one running on the device, there
is no point reinstalling identical firmware. As a result:

- A device reporting the new, **higher** version number was running the bad update and actually
  performed the rollback.
- A device still reporting a **lower** version number never received the bad update in the first
  place, for example because it was offline or had no connection during the rollout, and the guard
  prevented a pointless reinstall.

If the rollback were instead published under its original (lower) version number, these two
situations would be indistinguishable.
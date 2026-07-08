# BlueCherry client

## Functionality

The **bluecherry-client** daemon is a small application that runs on the IoT device. Any device
which uses the **bluecherry-client** is classified as a *full* device and thus it is built in such
a way that IoT connectivity is additional to the functionality of the device but not vital to the
core of its function. This is perfect for capable edge devices which need to be always available and
offer full functionality, even when offline.

The daemon performs the following tasks:
  * **Interface proxy**: your device typically offers its users a web-interface. Traditionally,
    reaching this UI over the web meant that the installer had to configure dynamic DNS, set up
    port forwarding and tune some firewall settings. This approach not only exposes this small
    webserver to the wide open internet, it's also a setup that easily breaks when the end-user
    changes something in their internal network (modem swap by the provider, router replacement,
    dynamic DNS service that stops working, ...). With the **bluecherry-client** you can access
    this local webserver from anywhere without having to worry about these settings.

  * **State monitor**: the **bluecherry-client** has a continuous connection with the BlueCherry
    platform and has a built-in *address book* in which you can save *notification destinations*
    that should be notified when the device goes offline and comes back online. The delay used to
    trigger an offline notification is configured on the [device type](../README.md#device-types)
    level.

  * **Notification gateway**: the BlueCherry platform has the capability to send
    [notifications](notifications.md). Via both the command line and an internally exposed JSON
    RESTful API you can easily send notifications from the IoT device.

  * **FOTA update daemon**: the **bluecherry-client** can be started as a daemon that installs
    unattended or attended [FOTA updates](fota-updates.md). The updates are installed automatically
    within a time window or by an inter-process-communication (IPC) trigger.

## Installation

The `bluecherry-client` is a statically linked binary without any external dependencies. This makes
it very easy to run on your system. Just download the binary, make it executable and run it.

### Linux

For Linux we distribute multiple different versions:
 - [bluecherry-client_linux_armv5](https://bluecherry.io/client/binary_releases/bluecherry-client_linux_armv5)
 - [bluecherry-client_linux_armv6](https://bluecherry.io/client/binary_releases/bluecherry-client_linux_armv6)
 - [bluecherry-client_linux_armv7](https://bluecherry.io/client/binary_releases/bluecherry-client_linux_armv7)
 - [bluecherry-client_linux_arm64](https://bluecherry.io/client/binary_releases/bluecherry-client_linux_arm64)
 - [bluecherry-client_linux_386](https://bluecherry.io/client/binary_releases/bluecherry-client_linux_386)
 - [bluecherry-client_linux_amd64](https://bluecherry.io/client/binary_releases/bluecherry-client_linux_amd64)

On most Linux systems the **bluecherry-client** binary is placed in the `/usr/local/bin` directory.
On systems that use `systemd` you can start the BlueCherry client automatically using service files.
A full deployment will typically start the **bluecherry-client** twice, once as the connection 
daemon and once as the OTA daemon.

Install the below file in `/etc/systemd/system/bluecherry-client.service` to start the
**bluecherry-client** as a connection daemon and make use of the built-in API server.

````systemd
[Unit]
Description=BlueCherry IoT connection daemon
After=network.target

[Service]
ExecStart=/usr/local/bin/bluecherry-client
Type=simple
Restart=always

NoNewPrivileges=yes
PrivateDevices=yes
DevicePolicy=closed
ProtectControlGroups=yes
ProtectKernelModules=yes
ProtectKernelTunables=yes
RestrictAddressFamilies=AF_INET AF_INET6
RestrictNamespaces=yes
RestrictRealtime=yes
RestrictSUIDSGID=yes
MemoryDenyWriteExecute=yes
LockPersonality=yes

ProtectClock=yes
ProtectHostname=yes
ProtectKernelLogs=true
# PrivateUsers=yes

CapabilityBoundingSet=~CAP_LINUX_IMMUTABLE CAP_IPC_LOCK CAP_SYS_CHROOT CAP_BLOCK_SUSPEND CAP_LEASE 
CapabilityBoundingSet=~CAP_SYS_ADMIN CAP_SYS_BOOT CAP_SYS_PACCT CAP_SYS_PTRACE CAP_SYS_RAWIO CAP_SYS_TIME CAP_SYS_TTY_CONFIG 
CapabilityBoundingSet=~CAP_WAKE_ALARM  CAP_MAC_ADMIN CAP_MAC_OVERRIDE 
CapabilityBoundingSet=~CAP_SETUID CAP_SETGID CAP_SETPCAP CAP_CHOWN CAP_NET_ADMIN 
CapabilityBoundingSet=~CAP_CHOWN CAP_FSETID CAP_SETFCAP
# CapabilityBoundingSet=~CAP_DAC_OVERRIDE CAP_DAC_READ_SEARCH CAP_FOWNER CAP_IPC_OWNER

[Install]
WantedBy=multi-user.target
````

If you also want to enable the OTA update service you can add the following service file as
`/etc/systemd/system/bluecherry-ota.service`:

````systemd
[Unit]
Description=BlueCherry IoT Over-The-Air update daemon
After=network.target

[Service]
ExecStart=/usr/local/bin/bluecherry-client ota
Type=simple
Restart=always

NoNewPrivileges=yes
PrivateDevices=yes
DevicePolicy=closed
ProtectControlGroups=yes
ProtectKernelModules=yes
ProtectKernelTunables=yes
RestrictAddressFamilies=AF_INET AF_INET6
RestrictNamespaces=yes
RestrictRealtime=yes
RestrictSUIDSGID=yes
MemoryDenyWriteExecute=yes
LockPersonality=yes

ProtectClock=yes
ProtectHostname=yes
ProtectKernelLogs=true
# PrivateUsers=yes

CapabilityBoundingSet=~CAP_LINUX_IMMUTABLE CAP_IPC_LOCK CAP_SYS_CHROOT CAP_BLOCK_SUSPEND CAP_LEASE 
CapabilityBoundingSet=~CAP_SYS_ADMIN CAP_SYS_BOOT CAP_SYS_PACCT CAP_SYS_PTRACE CAP_SYS_RAWIO CAP_SYS_TIME CAP_SYS_TTY_CONFIG 
CapabilityBoundingSet=~CAP_WAKE_ALARM  CAP_MAC_ADMIN CAP_MAC_OVERRIDE 
CapabilityBoundingSet=~CAP_SETUID CAP_SETGID CAP_SETPCAP CAP_CHOWN CAP_NET_ADMIN 
CapabilityBoundingSet=~CAP_CHOWN CAP_FSETID CAP_SETFCAP
# CapabilityBoundingSet=~CAP_DAC_OVERRIDE CAP_DAC_READ_SEARCH CAP_FOWNER CAP_IPC_OWNER

[Install]
WantedBy=multi-user.target
````

After installing these `systemd` files you must reload the daemon and enable the services to
automatically start them on boot:

````bash
sudo systemctl daemon-reload
sudo systemctl enable bluecherry-client.service
sudo systemctl enable bluecherry-ota.service
````

The BlueCherry client will now start on boot.

### Windows

For Windows we distribute the following versions:
- [bluecherry-client_windows_x86](https://bluecherry.io/client/binary_releases/bluecherry-client_windows_x86.exe)
- [bluecherry-client_windows_amd64](https://bluecherry.io/client/binary_releases/bluecherry-client_windows_amd64.exe)

### macOS

For macOS we support the following versions:
- [bluecherry-client_darwin_arm64](https://bluecherry.io/client/binary_releases/bluecherry-client_darwin_arm64)
- [bluecherry-client_darwin_amd64](https://bluecherry.io/client/binary_releases/bluecherry-client_darwin_amd64)

## Initial configuration and provisioning

The configuration and state of the **bluecherry-client** are saved in a YAML file. Depending on the
operating system the location of the YAML file is different:
 - Linux: `/etc/bluecherry/config.yaml`
 - Windows: `C:\ProgramData\BlueCherry\config.yaml`
 - macOS: `/Library/Application Support/BlueCherry/config.yaml`

A typical `config.yaml` has the following structure:

````yaml
auth:
    type_id: The BlueCherry type id
    dev_id: The BlueCherry device id
    dev_key: The BlueCherry device key
connection:
    port: The port of the local webserver you want to forward
    ssl: True if the local webserver is serving via SSL/TLS, false if not
ota:
    pubkey: The public key to validate OTA updates with
    cur_version: The currently installed OTA version
    auto_exec: True to enable unattended updates, false for timewindow or IPC updates
    working_directory: The working directory used to unpack/verify FOTA updates
offline_destination_list: A list of notification destinations to notify when the device goes offline
````

Before the BlueCherry client can be used, the device must be known to the platform. The first
precondition is that you have a manufacturer account and you created a
[device type](../README.md#device-types). This device type must be configured in the `config.yaml`
before any of the provisioning steps are taken. There are three possible ways to provision:
 - **Manual provision**: on your admin panel you can create the device and copy the *device id* and
   *device key* in the `config.yaml` file. The underlying connection keys will be automatically
   generated and you should be connected the next time you start the **bluecherry-client**.

 - **Provision by end customer**: if you execute the `bluecherry-client provision` command and
   log in with your BlueCherry end-user credentials the device will be created in the platform and
   it will be automatically claimed to your account. This is an interactive CLI mode and thus
   cannot be used in an automated production environment.

 - **Unattended ZTP provision**: if you pre-register the device in the platform, typically using the
   MAC address of the WAN adapter, the device can provision itself automatically on first connect.
   This is called *Zero-Touch Provisioning*.

## RESTful API for the application layer

When the BlueCherry client is provisioned it will start a local webserver on port 43770. For
security reasons this API server binds to `127.0.0.1` only so that even if your device doesn't have
a firewall in place the API is not usable for external clients.

### Send notifications

`POST /api/internal/messages`

Sends one or more [notifications](notifications.md). The request body is a JSON array, which
allows you to send multiple notifications in a single request. Every element of the array is a
notification object as described in the [notifications](notifications.md) documentation.

Example request which sends a plain text and HTML email:

````bash
curl -X POST http://127.0.0.1:43770/api/internal/messages \
  -H "Content-Type: application/json" \
  -d '[
    {
      "type": 1,
      "destination": "john@johndoe.com",
      "subject": "This is a test subject",
      "plain": "Hi\r\n\r\nThis is a test plaintext email.\r\n\r\nKind regards,\r\nThe BlueCherry team",
      "html": "<p>Hi</p><p>This is a test plaintext email.</p><p>Kind regards,<br/>The BlueCherry team</p>"
    }
  ]'
````

Example request which sends an SMS message and a push notification in one call:

````bash
curl -X POST http://127.0.0.1:43770/api/internal/messages \
  -H "Content-Type: application/json" \
  -d '[
    {
      "type": 2,
      "destination": "+32123456789",
      "message": "Hi, this is a test SMS message"
    },
    {
      "type": 4,
      "destination": "john@johndoe.com",
      "message": "Hi, this is a test push notification"
    }
  ]'
````

### Send an email with attachments

`POST /api/internal/messages`

To attach one or more files to an email the same endpoint is used, but the request is encoded as
`multipart/form-data` instead of JSON. The form fields correspond to the email notification
parameters and the attachment is added as a file field:

````bash
curl -X POST http://127.0.0.1:43770/api/internal/messages \
  -F "type=1" \
  -F "destination=john@johndoe.com" \
  -F "subject=Test email with attachments" \
  -F "plain=Hi, this is a test email with an attachment." \
  -F "html=<p>Hi, this is a test email with an attachment.</p>" \
  -F "file=@/path/to/attachment.jpg"
````

### Offline notification destinations

The *address book* of the [state monitor](#functionality) can be managed via the API. Every
destination in the address book will be notified when the device goes offline and comes back
online. A destination object has the following parameters:
  * **type**: the [notification type](notifications.md) used to notify this destination.
  * **destination**: the destination address, the format depends on the notification type.
  * **lang**: the language in which the destination is notified, as a two-letter language code
    (for example `en` or `nl`).
  * **name**: a human readable name for this destination.

`GET /api/internal/offline_notification_destinations`

Returns the list of configured offline notification destinations.

`POST /api/internal/offline_notification_destinations`

Adds a new offline notification destination and returns the full destination object, including
the `id` assigned to it:

````bash
curl -X POST http://127.0.0.1:43770/api/internal/offline_notification_destinations \
  -H "Content-Type: application/json" \
  -d '{
    "type": 1,
    "destination": "john@johndoe.com",
    "lang": "en",
    "name": "John Doe"
  }'
````

`PUT /api/internal/offline_notification_destinations/{id}`

Updates the offline notification destination with the given `id`. The `id` of a destination can be
found in the [GET](#offline-notification-destinations) response or in the object returned when the
destination was created. The request body is a complete destination object which replaces the
existing one.

`DELETE /api/internal/offline_notification_destinations/{id}`

Deletes the offline notification destination with the given `id`.
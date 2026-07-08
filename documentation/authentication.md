The BlueCherry authentication mechanism exposes the `bc-token` cookie to the application. The body of this cookie is a JWT (*JSON Web Token*) and allows the application to retrieve information about the BlueCherry user that accesses the application. Any JWT library can be used to decode the token. After decoding you can retrieve valuable information from the JWT body:

```
{
  "tokenId": "cto8jbrt",
  "accountId": "a7769e4e-bc97-4813-a428-3d622c2b8fd7",
  "accountTitle": 1,
  "accountFirstname": "John",
  "accountLastname": "Doe",
  "accountRights": [1, 2, 3],
  "exp": 1703802609,
  "issuer": "BlueCherry",
  "iat": 1703197809
}
```

The most important fields for the application are:
* **accountId**: this contains a uuidv4 which uniquely identifies a BlueCherry account.
* **accountTitle**: the title of the account (1: Mr, 2: Mrs)
* **accountFirstname**: the first name of the account holder.
* **accountLastname**: the last name of the account holder.
* **accountRights**: an array of rights, represented by integers, assigned to a user. Extra roles and rights can be created by device manufacturers.
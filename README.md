# Test AAD authentication with Tedious driver on Azure App Service

To run the app:

- Create on Azure `Web App + SQL`
- Set AAD Admin on sql Database

- Create DB table and rows
```

  CREATE TABLE [dbo].[assessment] (
    [assessment_id] [nvarchar](max),        
    [assessment_status] [nvarchar](max),
    [created_on] DATETIME,
    [modified_on] DATETIME
)
 GO

 Insert into [dbo].[assessment] ( assessment_id, assessment_status) values ('1000', 'success');
 Insert into [dbo].[assessment] ( assessment_id, assessment_status) values ('1002', 'retry');

 select * from [dbo].[assessment];
 ```

- set App Service > App Settings (or locally variables)

```
AZURE_AD_PASS=<PASS>
AZURE_AD_USER=<USER>@domain.onmicrosoft.com
AZURE_SQL_SRV=<SERVER>.database.windows.net
TEDIOUS_TDS_VERSION=7_4
WEBSITE_NODE_DEFAULT_VERSION=10.14.1
```
- Zip and Deploy to App service (e.g using Kudu https://scm.site/ZipDeployUI) or locally npm start


Error received:
```
Application has thrown an uncaught exception and is terminated:
Error: No event 'routingChange' in state 'SentLogin7Withfedauth'
    at Connection.dispatchEvent (D:\home\site\wwwroot\node_modules\tedious\lib\connection.js:1086:26)
    at Parser.tokenStreamParser.on.token (D:\home\site\wwwroot\node_modules\tedious\lib\connection.js:775:12)
    at emitOne (events.js:96:13)
    at Parser.emit (events.js:188:7)
    at Parser.parser.on.token (D:\home\site\wwwroot\node_modules\tedious\lib\token\token-stream-parser.js:27:14)
    at emitOne (events.js:96:13)
    at Parser.emit (events.js:188:7)
    at addChunk (D:\home\site\wwwroot\node_modules\readable-stream\lib\_stream_readable.js:296:12)
    at readableAddChunk (D:\home\site\wwwroot\node_modules\readable-stream\lib\_stream_readable.js:278:11)
    at Parser.Readable.push (D:\home\site\wwwroot\node_modules\readable-stream\lib\_stream_readable.js:239:10)
```

References:  
 https://docs.microsoft.com/en-us/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-2017

 https://docs.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-connect-msi

https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_load-environment-variables-from-external-file-node
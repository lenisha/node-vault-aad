var config = {
    server: process.env.AZURE_SQL_SRV,
    authentication: {
      type: 'azure-active-directory-password',
      options: {
        userName: process.env.AZURE_AD_USER,
        password: process.env.AZURE_AD_PASS,
      }
    },
    options: {
      database: 'nodevaulttestdb',
      encrypt: true, //indicates if the connection should be encrypted
      port: 1433, //port to establish connection
      rowCollectionOnRequestCompletion: true, //returns rows object on the new Request callback
      useColumnNames: true //returns columns names within the rows object on the new Request callback
    }
  };
  
  config.options.requestTimeout = 30 * 1000;
  config.options.debug = {
    data: true,
    payload: false,
    token: false,
    packet: true,
    log: true
  }

module.exports.config = config;
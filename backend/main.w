bring cloud;
bring postgres;
bring react;
bring math;

let api = new cloud.Api(cloud.ApiProps {
    cors: true,
    corsOptions: {
      allowOrigin: "http://localhost:4000"
    }
    });

  api.get("/documents", inflight (req) => {
    let documentId = req.query.get("userId");
    log("requested document");
    
    return cloud.ApiResponse {
    status: 200,
    body: Json.stringify([
      {
        id: "1",
        title: "Document 1"
      },
      {
        id: "2",
        title: "Document 2"
      }
    ])
  };  
  });


    let website = new react.App({
    projectPath: "../frontend",
    localPort: 4000
});


website.addEnvironment("API_URL", api.url);

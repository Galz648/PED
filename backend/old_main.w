bring openai;
// bring react;
// bring cloud;
// bring http;

// let apiKeySecret = new cloud.Secret(name: "OAIAPIKey") as "OpenAI Secret";

// class Assistant {
//     personality: str;
//     openai: openai.OpenAI;

//     new(personality: str) {
//         this.openai = new openai.OpenAI(apiKeySecret: apiKeySecret);
//         this.personality = personality;
//     }

//     pub inflight ask(question: str): str {
//         let prompt = "you are an assistant with the following personality: ${this.personality}. ${question}";
//         let response = this.openai.createCompletion(prompt, model: "gpt-4-turbo");
//         return response.trim();
//     }
// }

// let counter = new cloud.Counter();
// let store = new cloud.Bucket() as "responses";

// let db = new ex.Table({
//     name: "assistant",
//     primaryKey: "id",
//     columns: {
//         question: ex.ColumnType.STRING,
//         answer: ex.ColumnType.STRING
//     }
// });

// class RespondToQuestions {
//     id: cloud.Counter;
//     gpt: Assistant;
//     store: cloud.Bucket;

//     new(store: cloud.Bucket) {
//         this.gpt = new Assistant("Respondent");
//         this.id = new cloud.Counter() as "NextID";
//         this.store = store;
//     }

//     pub inflight sendPrompt(question: str): str {
//         let reply = this.gpt.ask("{question}");
//         let n = this.id.inc();
//         this.store.put("message-{n}.original.txt", reply);
//         return reply;
//     }
// }

// let api = new cloud.Api({ cors: true });
// let myAssistant = new RespondToQuestions(store) as "Helpful Assistant";

// api.post("/assistant", inflight((request) => {
//     let prompt = request.body;
//     let response = myAssistant.sendPrompt(JSON.stringify(prompt)); 
//     let id = counter.inc(); 
    
//     db.insert(id, { question: prompt, answer: response });

//     return cloud.ApiResponse({
//         status: 200
//     });
// }));

// api.get("/assistant", inflight(() => {
//     let questionsAndAnswers = db.list();

//     return cloud.ApiResponse({
//         body: JSON.stringify(questionsAndAnswers),
//         status: 200
//     });
// }));

// let website = new react.App({
//     projectPath: "../frontend",
//     localPort: 4000
// });

// website.addEnvironment("API_URL", api.url);

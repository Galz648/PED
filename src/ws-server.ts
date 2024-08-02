import { watchFile } from 'fs';
import { command } from "./utils"
import { WebSocketServer } from 'ws';
import * as path from 'path'

import { spawn } from 'node:child_process';



export function command(command: string, args: string[]) { // TODO: move to utils
    const child = spawn(command, args)

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

}


// const COLD_RELOAD_FILES = ["public/index.html", "public/index.ts"];
// // const HOT_RELOAD_FILES = ["./lib/grammer_validator.js"];

// COLD_RELOAD_FILES.forEach((file) =>
//     watchFile(path.join(__dirname, file), { interval: 50 }, () => {
//         console.log("cold restart");
//         websockets.forEach((socket) => socket.send("cold"));
//     })
// );

// HOT_RELOAD_FILES.forEach((file) =>
//     watchFile(path.join(__dirname, file), { interval: 50 }, () => {
//         websockets.forEach((socket) => socket.send("hot"));
//     })
// );

// command('tsc', ["-w"], );
command('http-server', ["./public/", "-p", "6969", "127.0.0.1", "-s", "-c-1"]);

// // watch files
// const port = "6970";
// const wss = new WebSocketServer({ port: Number(port) });

// // /** @type {import("ws").WebSocket[]} */
// const websockets: any[] = [];

// wss.on("connection", (ws) => {
//     websockets.push(ws);
//     console.log(`new connection: ${(String(websockets))}`)

//     ws.on("close", () => {
//         websockets.splice(websockets.indexOf(ws), 1);
//     });
// });


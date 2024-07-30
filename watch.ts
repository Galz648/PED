
import { spawn } from 'child_process';

function command(command: string, args: string[]) {
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



// command('node', ["./public/devServer.js"])
command('http-server', ["./public/", "-p", "6969", "127.0.0.1", "-s", "-c-1"]);




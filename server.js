const { resolve } = require('dns');
const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        return response.end();
    }

    let body = '';

    request.on('data', chunk => {
        body += chunk;
    });

    request.on('end', async () => {
        const data = JSON.parse(body);

        console.log('Received need:', data.need);
        const number = await getNextAvailableId();
        console.log("YO:", number);
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        response.write(JSON.stringify({
            number : number
        }))

        response.end();
    });
});

async function addUserToDatabase(id)
{

}

async function updateUserName(id, name)
{

}

async function updateUserHighscore(id, highscore)
{
    
}

server.listen(3050, 'localhost', () => {
    console.log("Server running at http://localhost:3050/");
});

async function getNextAvailableId()
{
    const response = await fetch("http://localhost:3000/stats");

    const text = await response.json();
    console.log(text.highestID);

    return text.highestID;
}

function getTopTen()
{

}


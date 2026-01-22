const http = require('http');

let todos = [
    { id: 1, task: 'Buy milk' },
    { id: 2, task: 'Clean room' }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/tasks' && req.method === 'GET') {
        res.end(JSON.stringify(todos));
    } 

    else if (req.url === '/tasks' && req.method === 'POST') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            const newTodo = {
                id: todos.length + 1,
                task: data.task
            };
            todos.push(newTodo);
            res.end(JSON.stringify(newTodo));
        });
    }

    else if (req.url.startsWith('/tasks/') && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[2]);
        todos = todos.filter(item => item.id !== id);
        res.end(JSON.stringify({ message: 'Deleted successfully' }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Page not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000/tasks');
});
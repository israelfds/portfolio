const canvas = document.getElementById('flockCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flock = [];
const obstacles = [];
const numEntities = 3000; // Altere o número de setinhas aqui
const obstacleSize = 100; // Tamanho dos obstáculos
const avoidanceForce = 1; // Força para desviar dos obstáculos


function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
        };
        this.maxSpeed = 1;
        this.maxForce = 0.03;
        this.size = 8; // Increase size to accommodate the arrow

        // Calculate the angle of the arrow based on velocity
        this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Wrap around the screen edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Update the angle of the arrow based on velocity
        this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    }

    // Função para obter a cor gradualmente com um atraso
    getRandomColorWithDelay() {
        // Definir um intervalo de tempo em milissegundos para mudar a cor (por exemplo, 1000 ms = 1 segundo)
        const interval = 1000;

        // Gerar uma nova cor aleatória apenas em intervalos específicos
        if (!this.lastColorChange || Date.now() - this.lastColorChange >= interval) {
            this.currentColor = randomColor();
            this.lastColorChange = Date.now();
        }

        return this.currentColor;
    }


    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Desenhar a seta colorida
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(-this.size / 2, this.size / 4);
        ctx.lineTo(-this.size / 2, -this.size / 4);
        ctx.fillStyle = "grey"; // Altere a cor aqui para a cor desejada
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    applyForce(force) {
        this.velocity.x += force.x;
        this.velocity.y += force.y;

        // Limit the velocity to the maximum speed
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (speed > this.maxSpeed) {
            this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
            this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }
    }

    flock(entities) {
        const separationRadius = 10; // Raio para regra de separação
        const alignmentRadius = 30; // Raio para regra de alinhamento
        const cohesionRadius = 5; // Raio para regra de coesão

        const separationForce = { x: 0, y: 0 };
        const alignmentForce = { x: 0, y: 0 };
        const cohesionForce = { x: 0, y: 0 };

        let separationCount = 0;
        let alignmentCount = 0;
        let cohesionCount = 0;

        for (const otherEntity of entities) {
            if (otherEntity === this) continue; // Ignorar o próprio objeto

            // Calculando a distância entre esta entidade e a outra
            const dx = otherEntity.x - this.x;
            const dy = otherEntity.y - this.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            // Regra de separação
            if (distance < separationRadius) {
                separationForce.x -= dx / distance;
                separationForce.y -= dy / distance;
                separationCount++;
            }

            // Regra de alinhamento
            if (distance < alignmentRadius) {
                alignmentForce.x += otherEntity.velocity.x;
                alignmentForce.y += otherEntity.velocity.y;
                alignmentCount++;
            }

            // Regra de coesão
            if (distance < cohesionRadius) {
                cohesionForce.x += otherEntity.x;
                cohesionForce.y += otherEntity.y;
                cohesionCount++;
            }
        }

        // Média das forças para obter o comportamento coletivo
        if (separationCount > 0) {
            separationForce.x /= separationCount;
            separationForce.y /= separationCount;
        }

        if (alignmentCount > 0) {
            alignmentForce.x /= alignmentCount;
            alignmentForce.y /= alignmentCount;
        }

        if (cohesionCount > 0) {
            cohesionForce.x /= cohesionCount;
            cohesionForce.y /= cohesionCount;
            cohesionForce.x -= this.x;
            cohesionForce.y -= this.y;
        }

        // Aplicar as forças resultantes
        this.applyForce(separationForce);
        this.applyForce(alignmentForce);
        this.applyForce(cohesionForce);
    }


    // Método para verificar colisões com obstáculos
    checkObstacleCollisions() {
        for (const obstacle of obstacles) {
            const dx = obstacle.x - this.x;
            const dy = obstacle.y - this.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            if (distance < this.size + obstacle.size) {
                // A setinha colidiu com o obstáculo, desviar da colisão
                const angle = Math.atan2(dy, dx);
                this.velocity.x -= avoidanceForce * Math.cos(angle);
                this.velocity.y -= avoidanceForce * Math.sin(angle);
            }
        }
    }
}

function createNewEntity(x, y) {
    flock.push(new Entity(x, y));
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Função para adicionar obstáculos aleatórios
function addRandomObstacle(x, y) {
    const obstacleSize = getRandomNumber(10, 40); // Tamanho aleatório entre 10 e 40
    obstacles.push({ x, y, size: obstacleSize });
}

// Função de tratamento do evento de clique no canvas
function canvasClickHandler(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    addRandomObstacle(x, y);
    createNewEntity(x, y); // Adiciona uma nova entidade no clique
}

// Adicionando o evento de clique ao canvas
canvas.addEventListener('click', canvasClickHandler);

// Initialize the flock with entities
for (let i = 0; i < numEntities; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    flock.push(new Entity(x, y));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update and draw entities
    for (const entity of flock) {
        entity.checkObstacleCollisions();
        entity.flock(flock);
        entity.update();
        entity.draw();
    }

    // Desenhar os obstáculos
    for (const obstacle of obstacles) {
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

setInterval(createNewEntity, 1000);

animate();
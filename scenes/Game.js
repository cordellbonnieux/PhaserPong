import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    preload() {

    }

    create() {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.physics.add.existing(ball)
        ball.body.setBounce(1, 1)

        ball.body.setCollideWorldBounds(true, 1, 1)

        ball.body.setVelocity(-200, 0)

        const paddleLeft = this.add.rectangle(50, 250, 20, 100, 0xffffff, 1)
        this.physics.add.existing(paddleLeft, true)
        this.physics.add.collider(paddleLeft, ball)


        const paddleRight = this.add.rectangle(750, 250, 20, 100, 0xffffff, 1)
        this.physics.add.existing(paddleRight, true)
        this.physics.add.collider(paddleRight, ball)

        this.input.keyboard.on('keydown-W', (e) => {
            if (paddleLeft.y > 50) {
                paddleLeft.setY(paddleLeft.y - 10)
            }
        })

        this.input.keyboard.on('keydown-S', (e) => {
            if (paddleLeft.y < 450) {
                paddleLeft.setY(paddleLeft.y + 10)
            }
        })
    }

    update() {

    }
}
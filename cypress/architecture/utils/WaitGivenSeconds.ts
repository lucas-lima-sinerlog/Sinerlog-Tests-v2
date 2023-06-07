export class Wait {

    static Seconds(seconds: number) {
        cy.wait(seconds * 1000)
    }

    static Minutes(minutes: number) {
        cy.wait((minutes * 60) * 1000)
    }
}


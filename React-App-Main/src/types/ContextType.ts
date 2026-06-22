interface CardType {
    front: {
        cardName: string
        cardDate: string
        cardNumber: string
    }
    back: {
        cardCvc: string
    }

}

interface ExpectationType {
    inputName: string
    inputType: string
    inputPlaceholder: string
    inputId: string
}

interface InputType {
    inputName: string
    inputType: string
    inputPlaceholder: string
    inputId: string
}

interface CompleteStateType {
    image: string
    title: string
    description: string
    button: {
        text: string
    }
}

export type ContextType = {
    card: CardType
    inputs: InputType[]
    Expectation: {
        Name: string
        input: ExpectationType[]
    },
    button: {
        text: string
    }
    completeState: CompleteStateType
}   
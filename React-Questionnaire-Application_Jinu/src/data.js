export const questions = [
    {
        id: 1,
        name: 'first name',
        q: "What is your first name?",
        type: 'text',
        expects: 'string',
    },
    {
        id: 2,
        name: 'age',
        q: "How old are you?",
        expects: 'number',
        type: 'number',
        condition: {
            c: (n) => n >= 18 && n < 65,
            condition_string: '>= 18 and < 65 years old'
        }
    },
    {
        id: 3,
        name: 'significant other',
        q: "Do you have a significant other?",
        expects: 'boolean',
        type: 'dropdown',
        options: ['yes', 'no']
    },
    {
        id: 4,
        name: "significant other's name",
        q: "What's yout significant other's name?",
        expects: 'string',
        type: 'text',
        rerquires_question: {
            id: 3,
            answer: 'yes'
        }
    },
    {
        id: 5,
        name: 'last name',
        q: "What is yout last name?",
        expects: 'string',
        type: 'text',
    }
]


export const ValidationRegex = [
    { type: 'string', regex: /^[A-Za-z]+$/ },
    { type: 'number', regex: /^[0-9]+$/ },
]

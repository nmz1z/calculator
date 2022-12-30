const buttonsArray = [
    {
        title: 'C',
        class: 'button special',
        function: () => {
            clearNumber();
        }
    },
    {
        title: '+-',
        class: 'button special',
        function: () => {
            operateCurrent('+-')
        }
    },
    {
        title: '%',
        class: 'button special',
        function: () => {
            operateCurrent('%');
        }
    },
    {
        title: '√',
        class: 'button special',
        function: () => {
            operateCurrent('√');
        }
    },
    {
        title: 'M',
        class: 'button special',
        function: () => {
            memoryAddNumber();
        }
    },
    {
        title: 'MR',
        class: 'button special',
        function: () => {
            memoryRecallNumber();
        }
    },
    {
        title: 'MC',
        class: 'button special',
        function: () => {
            memoryClear();
        }
    },
    {
        title: '+',
        class: 'button operator',
        function: () => {
            addOperator('+');
        }
    },
    {
        title: '1',
        class: 'button number',
        function: () => {addNumber(1);}
    },
    {
        title: '2',
        class: 'button number',
        function: () => {
            addNumber(2);
        }
    },
    {
        title: '3',
        class: 'button number',
        function: () => {
            addNumber(3)
        }
    },
    {
        title: '-',
        class: 'button operator',
        function: () => {
            addOperator('-');
        }
    },
    {
        title: '4',
        class: 'button number',
        function: () => {
            addNumber(4)
        }
    },
    {
        title: '5',
        class: 'button number',
        function: () => {
            addNumber(5)
        }
    },
    {
        title: '6',
        class: 'button number',
        function: () => {
            addNumber(6)
        }
    },
    {
        title: '*',
        class: 'button operator',
        function: () => {
            addOperator('*');
        }
    },
    {
        title: '7',
        class: 'button number',
        function: () => {
            addNumber(7)
        }
    },
    {
        title: '8',
        class: 'button number',
        function: () => {
            addNumber(8)
        }
    },
    {
        title: '9',
        class: 'button number',
        function: () => {
            addNumber(9)
        }
    },
    {
        title: '/',
        class: 'button operator',
        function: () => {addOperator('/');}
    },
    {
        title: '0',
        class: 'button number doubled',
        function: () => {addNumber(0)}
    },
    {
        title: '.',
        class: 'button number',
        function: () => {addDecimal();}
    },
    {
        title: '=',
        class: 'button operator',
        function: () => {
            operate(activeOperator);
        }
    }
]

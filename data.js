const buttonsArray = [
    {
        title: 'C',
        class: 'button special',
        function: () => {
            document.querySelector('.display__number--big').textContent = "0"
            activeNumber = 0;
            storedNumber = 0;
        }
    },
    {
        title: '+-',
        class: 'button special',
        value: '',
        function: () => {
            activeNumber = activeNumber * -1;
            updateDisplayNumber(activeNumber);
        }
    },
    {
        title: '%',
        class: 'button special',
        value: 1,
        function: () => {

        }
    },
    {
        title: '√',
        class: 'button special',
        value: 1,
        function: () => {
            addOperator('√');
        }
    },
    {
        title: 'M',
        class: 'button special',
        value: '',
        function: () => {

        }
    },
    {
        title: 'MR',
        class: 'button special',
        value: '',
        function: () => {

        }
    },
    {
        title: 'MC',
        class: 'button special',
        value: '',
        function: () => {

        }
    },
    {
        title: '+',
        class: 'button operator',
        value: 'plus',
        function: () => {
            addOperator('+');
        }
    },
    {
        title: '1',
        class: 'button number',
        value: 1,
        function: () => {addNumber(1);}
    },
    {
        title: '2',
        class: 'button number',
        value: 2,
        function: () => {
            addNumber(2);
        }
    },
    {
        title: '3',
        class: 'button number',
        value: 3,
        function: () => {
            addNumber(3)
        }
    },
    {
        title: '-',
        class: 'button operator',
        value: 'minus',
        function: () => {
            addOperator('-');
        }
    },
    {
        title: '4',
        class: 'button number',
        value: '',
        function: () => {
            addNumber(4)
        }
    },
    {
        title: '5',
        class: 'button number',
        value: '',
        function: () => {
            addNumber(5)
        }
    },
    {
        title: '6',
        class: 'button number',
        value: '',
        function: () => {
            addNumber(6)
        }
    },
    {
        title: '*',
        class: 'button operator',
        value: 'multiply',
        function: () => {
            addOperator('*');
        }
    },
    {
        title: '7',
        class: 'button number',
        value: 7,
        function: () => {
            addNumber(7)
        }
    },
    {
        title: '8',
        class: 'button number',
        value: 8,
        function: () => {
            addNumber(8)
        }
    },
    {
        title: '9',
        class: 'button number',
        value: '9',
        function: () => {
            addNumber(9)
        }
    },
    {
        title: '/',
        class: 'button operator',
        value: 'divide',
        function: () => {
            addOperator('/');
        }
    },
    {
        title: '0',
        class: 'button number doubled',
        value: '',
        function: () => {
            addNumber(0)
        }
    },
    {
        title: '.',
        class: 'button number',
        value: '',
        function: () => {
            addNumber('.');
        }
    },
    {
        title: '=',
        class: 'button operator',
        value: 'equal',
        function: () => {
            operate(activeNumber, storedNumber, activeOperator);
        }
    }
]

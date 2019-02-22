'use-strict'

var operator_list = ['-/+','%','÷','×','−','+','='],
    operators_exist = false,
    comma_alowed = true;

var operator_object = [
    {
        name:'.',
        math_op: '.'
    },
    {
        name:'%'
    },
    {
        name:'÷',
        math_op:'/'
    },
    {
        name:'×',
        math_op:'*'
    },
    {
        name:'−',
        math_op:'-'
    },
    {
        name:'+',
        math_op:'+'
    },
    {
        name:'=',
        math_op: 'Enter'
    },
    {
        name:'AC',
        math_op: 'Delete'
    }
    ];

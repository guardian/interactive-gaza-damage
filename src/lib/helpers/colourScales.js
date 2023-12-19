const ecoStatusCategories = [
    {colour: '#7b5a00', label: 'Bad'},
    {colour: '#c1a127', label: 'Poor'}, 
    {colour: '#bababa', label: 'Moderate' }, 
    {colour: '#5ba3dc', label: 'Good'}, 
    {colour: '#004975', label: 'High'},
]

const phosphateStatusColourScale = [
    {position: '0%', colour: 'rgba(234,204,160,1)', label: '0'},
    {position: '70%', colour: 'rgba(161,132,92,1)'}, 
    {position: '80%', colour: 'rgba(134,109,80,1)'}, 
    {position: '90%', colour: 'rgba(107,88,64,1)'},
    {position: '100%', colour: 'rgba(87,72,53,1)', label: '1'},
]

export { 
    ecoStatusCategories, 
    phosphateStatusColourScale 
}
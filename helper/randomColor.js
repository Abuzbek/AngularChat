const colors = ()=>{
    let r;
    let g;
    let b;
    setInterval(() => {
        r = Math.floor(Math.random() * 256)
        g = Math.floor(Math.random() * 256)
        b = Math.floor(Math.random() * 256)
       
   }, 2000);
   const randomColors = () => {
       return `rgb(${r} , ${g} , ${b})`
   }
   module.exports = randomColors;
}
colors()



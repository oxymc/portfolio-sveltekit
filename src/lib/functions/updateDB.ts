export const updateDB = (error: string | boolean) => {
	if(error) {
        console.log(error)
    }
    else {
        successfulRender()
    }
};

function successfulRender() {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.classList.add("modal")
  
    // and give it some content
    const newContent = document.createTextNode("✓ The information was updated!");
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("forModal");
    currentDiv?.append(newDiv);
    setTimeout(()=> {
        newDiv.remove() 
    }, 1200)
}
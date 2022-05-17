var partid;

function websiteVisits(response) {
  document.querySelector("#visits").textContent = response.value;
 
  partid = response.value+1000;
  console.log(partid);
  
}

const colorCode = {
  black: "010",
  white: "#fff"
};

export { colorCode };

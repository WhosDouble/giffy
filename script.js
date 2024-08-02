let btn = document.getElementById("submit-btn");

let generateGif = async () => {
  //display loader until gifs load
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";

  //Get search value (default => batman)
  let q = document.getElementById("search-box").value;
  //display 10 gifs
  let gifCount = 15;
  //the API URI
  let apiUri = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";

  //Make a req to api
  try {
    const res = await fetch(apiUri);
    const data = await res.json();
    console.log(data);
    //all gifs
    let gifsData = data.data;
    gifsData.forEach((gif) => {
      //Gen cards for the gifs
      let container = document.createElement("div");
      container.classList.add("container");
      let iframe = document.createElement("img");
      console.log(gif);
      iframe.setAttribute("src", gif.images.downsized_medium.url);
      iframe.onload = () => {
        //if iframe isLoaded reduce count when each gif loads
        gifCount--;
        if (gifCount === 0) {
          //If all gifs load then hide loader and display gifs
          loader.style.display = "none";
          document.querySelector(".wrapper").style.display = "grid";
        }
      };
      container.append(iframe);

      //Copy link
      let copyBtn = document.createElement("button");
      copyBtn.innerText = "Copy Gif";
      copyBtn.onclick = () => {
        //Append the optained ID to the Default ID
        let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
        //Copy text inside text field
        navigator.clipboard
          .writeText(copyLink)
          .then(() => {
            alert("GIF copied to clipboard");
          })
          .catch(() => {
            alert("GIF copied to clipboard");
            let hiddenInput = document.createElement("input");
            hiddenInput.setAttribute("type", "text");
            document.body.appendChild(hiddenInput);
            hiddenInput.value = copyLink;
            //select input
            hiddenInput.select();
            //Copy the value
            document.execCommand("copy");
            //remove the input
            document.body.removeChild(hiddenInput);
          });
      };
      container.append(copyBtn);
      document.querySelector(".wrapper").append(container);
    });
  } catch (err) {
    console.log(err);
  }
};

//Generate Gifs on screen load || user clicks submit
btn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);

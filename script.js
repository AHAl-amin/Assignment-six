let media;
const loadAllMedia = async (searchText = '') => {
  const response = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)

  const mediaData = await response.json();
  media = mediaData.posts
  // console.log(media);
  displayMedia(media)
}

const loadAllMedia2 = async () => {
  const response = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts`)

  const mediaData = await response.json();
  media = mediaData.posts
  // console.log(media);
  displayMedia(media)
}
loadAllMedia2();

const displayMedia = media => {
  const mediaContainar = document.getElementById('media-containar');

  mediaContainar.textContent = ""
  media.forEach(item => {
    // console.log(item)
    const mediaDiv = document.createElement('div');


    mediaDiv.innerHTML = `
       
        <div class="flex-1  card border-2 border-gray-200 flex flex-col lg:flex-row gap-5 p-5">
        <div class="w-1/2 lg:w-1/6">
        
        // <div class="${item.isActive ? 'bg-green-400' : 'bg-red-500'} w-3 h-3 rounded-full ml-[108px]">
        </div>
          <img src="${item.image}" alt="">

        </div>
        <div class="w-5/6 space-y-4">
          <div class="flex flex-col lg:flex-row gap-4 font-bold">
           <p># ${item.category}</p>
           <p>Author : ${item.author.name}</p>
          </div>
          <h3 id="title" class="font-bold text-xl">${item.title}</h3>
          <p class=" text-gray-500 ">${item.description}</p>
         <div class="flex  justify-between">
           <div class="flex flex-col lg:flex-row gap-5">
             <p><i class="fa-regular fa-message"></i> <span class="ml-2">${item.comment_count}</span></p>
             <p><i class="fa-regular fa-eye"></i> <span class="ml-2">${item.view_count}</span></p>
             <p><i class="fa-regular fa-clock"></i><span class="ml-2">${item.posted_time
      }</span></p>
             
            </div>
            <div>
             <button  onclick="mediaClick(${item.id})" class="text-white bg-green-600 rounded-full p-1">
               <i class="fa-regular fa-envelope"></i>
              </button>
            </div>
         </div>
        </div>
       </div>
        `;
    mediaContainar.appendChild(mediaDiv);

  })
}

// handle search button.....
const mediaSearch = () => {
  document.getElementById('loading-spinner').style.display = "block"
  setTimeout(function () {
    document.getElementById('loading-spinner').style.display = 'none';
  }, 2000);
  const searchField = document.getElementById('sreach-field');
  const searchText = searchField.value;
  // console.log(searchText)
  loadAllMedia(searchText);

}

// add media ,comedy, coding btn view and title
let count = 0;
const mediaClick = (id) => {
  console.log(id)
  count = count + 1;

  let mediaCount = document.getElementById('media-count')
  mediaCount.innerText = count;
  const data = media.find(item => item.id == id);
  const mediaTitleViewContainar = document.getElementById('media-title-view-containar');
  const div = document.createElement('div');
  div.classList = `flex items-center justify-between gap-10 bg-white py-5 px-2 rounded-xl`
  div.innerHTML = `
            <p class="text-black text-[14px] font-bold ">${data.title}</p>
            <p class="flex items-center"><i class="fa-regular fa-eye"></i> <span>${data.view_count}</span></p>
`

  mediaTitleViewContainar.appendChild(div);
  setInnerText('media-count', count);



}
function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}





// loadAllMedia();


// .....................................
// latest post functional part
const latestAllPost = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')

  const latestPost = await response.json();
  // console.log(latestPost);
  displayAllPost(latestPost);

}
const displayAllPost = latestPost => {
  const postContainar = document.getElementById('all-post-containar');


  latestPost.forEach(item => {
    // console.log(item)

    const postDiv = document.createElement('div');

    postDiv.innerHTML = `
      <div class="card  bg-base-100 shadow-xl  items-center">
          <figure class="px-10 pt-10">
            <img src='${item.cover_image
      }' alt="Shoes"
              class="rounded-xl" />
          </figure>
          <div class="card-body ">
            <p class="text-gray-500"><i class="fa-regular fa-calendar"></i><span class="ml-2">"${item.author.posted_date ? item.author.posted_date : 'No publish date'}"</span></p>
            <h2 class="card-title font-bold text-xl">"${item.title}"
            </h2>
            <p class="text-gray-500">${item.description} </p>
            <div class="card-actions flex items-center mt-4 gap-2">
              <div>
              <img class="rounded-full" width="100px" height="100px" src="${item.profile_image}" alt="">
              </div>
              
              <div class="space-y-2">
                <p class="font-bold text-black">"${item.author.name}"</p>
                <p class="text-gray-500">"${item.author.designation ? item.author.designation : 'Unknown'}"</p>
              </div>
            </div>
          </div>
        </div>
      `;
    postContainar.appendChild(postDiv);

  })
};
latestAllPost();
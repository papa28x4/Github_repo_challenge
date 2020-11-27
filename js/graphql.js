// privacy:PUBLIC
const repoList = document.querySelector('#my-github-repos')
const userInfoArea = document.querySelector('.profile.left-part')
const userAvatars = document.querySelectorAll('.user-avatar')
const loginName = document.querySelectorAll('.login')
const userMenu = document.querySelector('.status-mobile.miniature')
let lists = '';
let circle;
const github_options = {
    "token": "adb05b2e91ad2e67aea495c9cee3e6c2b0e11303",
    "username": "papa28x4",
    "limit" : 20,
    "privacy": "PUBLIC"
}
const {token, username, limit, privacy} = github_options
const payload = `query
{
  viewer {
    login
    avatarUrl
    name
    bio
    status {
      emojiHTML
      message
      __typename
    }
    followers {
        totalCount
      }
    following{
        totalCount
      }
    starredRepositories {
        totalCount
      }
    repositories(first: ${limit}, privacy:${privacy}, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        viewerHasStarred
        updatedAt
        forkCount
        isFork
        isPrivate
        parent{
          nameWithOwner
          forkCount
          url
          licenseInfo {
            name
          }
        }
        primaryLanguage {
          color
          name
        } 
      }
    }
  }
}
  `


const formatDate=(dateString)=>{
    let date = "";
    let num = "";
    let timestamp = new Date(dateString).getTime() 
    if(timestamp + (28*86400000) < Date.now()){
        let z = new Date(timestamp).toDateString()
        let t = z.split(" ")
        let filteredT = t.filter((item, index)=> index !== 0)  
        filteredT.forEach((t,i)=> {
            if(i===1){
                date += " "
            }else if(i===2){
                date += ", "
            }
            date += t
        })
    }else if(Date.now()-timestamp < 60000){
        num = `${Math.floor((Date.now()-timestamp) / 1000)}`
        date = num > 1? `${num} seconds ago` : `${num} second ago`
    }else if(Date.now()-timestamp < 3600000){
        num = `${Math.floor((Date.now()-timestamp) / 60000)}`
        date = num > 1? `${num} minutes ago` : `${num} minute ago`
    }else if(Date.now()-timestamp < 86400000){
        num = `${Math.floor((Date.now()-timestamp) / 3600000)}`
        date = num > 1? `${num} hours ago` : `${num} hour ago`
    }else if(Date.now()-timestamp < (2*86400000)){
        date = `Yesterday`
    }else if(Date.now()-timestamp < 2419200000){
        num = `${Math.floor((Date.now()-timestamp) / 86400000)}`
        date = num > 1? `${num} days ago` : `${num} day ago`
    }
    return date
}

const renderRepos = repos => {
    repos.forEach(repo => {
        lists += `<li class="repo">
        <div class="repo-left">
            <h3 class="repo-name">
                <a href="${repo.url}">${repo.name}</a>
                ${repo.isPrivate? `<span class="repo-private">Private</span>` : ''}
            </h3>
            ${repo.isFork? ` <p class="repo-forked">
            Forked from <a href="${repo.parent.url}">${repo.parent.nameWithOwner}</a>
        </p>` : ''}
        
            ${repo.description? `  <p class="repo-desc">${repo.description}</p>` : ''}
        
            <div class="repo-meta">
                <span class="repo-lang meta">
                <span class="repo-lang-legend" style="background-color:${repo.primaryLanguage.color}"></span>
                <span>${repo.primaryLanguage.name}</span>
                </span>
                ${repo.stargazerCount? `<span class="repo-star meta">
                <svg aria-label="star" class="profile-icons" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                ${repo.stargazerCount}
            </span>` : '' }
                
                ${repo.forkCount || repo.parent !== null ?
                    ` <span class="repo-fork meta">
                    <svg aria-label="fork" class="profile-icons" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                    ${repo.parent === null?  repo.forkCount : repo.parent.forkCount }` : ''
                }
            
                </span>
                ${repo.isFork && repo.parent.licenseInfo && repo.parent.licenseInfo.name !== 'GNU General Public License v3.0'? `<span class="repo-license">
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
                ${repo.parent.licenseInfo.name}
            </span>` : ''}
                <span>
                    Updated 
                    <span class="repo-date">${formatDate(repo.updatedAt)}</span>
                </span>
            </div>
        </div>
        <div class="repo-right">
            <button class="btn-star ${repo.viewerHasStarred? `starred` : ''}">
                <svg class="stroke" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                <svg class="fill" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>
                <span class="user-review">${repo.viewerHasStarred ? `Unstar`: `Star`}</span>
            </button>
        </div>
    </li>
        `
    })
    
    repoList.innerHTML = lists
    const [count, repoType] = document.querySelectorAll('.repo-stat strong')
    count.textContent = repos.length
    repoType.textContent = privacy.toLowerCase()
}

const renderUserInfo = user => {
    let status = `<div class="offset">
                    <div>
                        <div class="circle">
                            <img style="height:auto;" alt="" width="260" height="260" class="profile-image" src="${user.avatarUrl}">
                            <div class="status">
                                <div class="one squares">
                                <span class="comment">
                                ${user.status.emojiHTML}
                                </span>
                               
                                </div>
                                <div class="two squares">${user.status.message}</div>
                                <div class="three squares"></div>
                            </div>
                            <span class="tooltiptext">Change your avatar</span>
                        </div>
                        <div id="name-container">
                            <h1>
                                <span id="name">${user.name}</span>
                                <span id="additionalName">${user.login}</span>
                            </h1>
                        </div> 
                    </div>
                    <div class="status-mobile">
                        ${user.status.emojiHTML}
                        <p>${user.status.message}</p>
                    </div>
                    <div class="user-bio">
                        <p>${user.bio}</p>
                    </div>
                    <div>
                        <button class="edit-profile-btn">Edit profile</button>
                    </div>
                    <div id="followers-container">
                        <div>
                            <a href="">
                                <svg class="profile-icons" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
                                <span id="followers" class="count">${user.followers.totalCount}</span>
                                followers
                            </a>
                            <span class="dot">.</span>
                            <a href="">
                                <span id="following" class="count">${user.following.totalCount}</span>
                                following
                            </a>
                            <!-- <span class="dot">.</span> -->
                            <span class="dot">.</span>
                            <a href="">
                                <svg class="profile-icons" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                                <span id="stars" class="count">${user.starredRepositories.totalCount}</span>
                            </a>
                        </div>
                    </div>
                    <div id="highlights" class="profile-sections">
                        <h2>Highlights</h2>
                        <div>
                            <svg class="profile-icons" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z"></path></svg>
                            <span>Arctic Code Vault Contributor</span>
                        </div>
                    </div>
                    <div id="organizations" class="profile-sections">
                        <h2>Organizations</h2>
                        <!-- <div>
                            <a href="">
                                <img alt="@team-muses" width="32" height="32" src="https://avatars0.githubusercontent.com/u/55638946?s=60&amp;v=4" class="avatar ">
                            </a>
                            <a href="">
                                <img alt="@team-anduril" width="32" height="32" src="https://avatars2.githubusercontent.com/u/55351647?s=60&amp;v=4" class="avatar ">
                            </a>
                            <a href="">
                                <img alt="@team-muses" width="32" height="32" src="https://avatars0.githubusercontent.com/u/55638946?s=60&amp;v=4" class="avatar ">
                            </a>
                            <a href="">
                                <img alt="@team-granite" width="32" height="32" src="https://avatars3.githubusercontent.com/u/66477648?s=60&amp;v=4" class="avatar ">
                            </a>
                            <a href="">
                                <img alt="@expenseng" width="32" height="32" src="https://avatars3.githubusercontent.com/u/69351735?s=60&amp;v=4" class="avatar ">
                            </a>
                        </div> -->
                    </div>
                </div>`
    
    userInfoArea.innerHTML = status
    circle = document.querySelector('.circle')
    userAvatars.forEach(avatar => avatar.src = user.avatarUrl)
    loginName.forEach(name => name.textContent = user.login)
    let menuStatus = user.status.emojiHTML
    menuStatus += `<p>${user.status.message}</p>`
    userMenu.innerHTML =  menuStatus
    

}

const fetchGithubData = async () => {
    const response = await fetch("https://api.github.com/graphql", {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        referrerPolicy: "no-referrer",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `token ${token} `,
                        },
                        body: JSON.stringify({query: payload})
                    }).then(res=> res.json())
      
    document.querySelector('.repo-num').textContent =  response.data.viewer.repositories.totalCount
    let repos = response.data.viewer.repositories.nodes
    let userDetails = response.data.viewer
    
    renderUserInfo(userDetails)
    renderRepos(repos)
}























window.addEventListener('load', fetchGithubData)
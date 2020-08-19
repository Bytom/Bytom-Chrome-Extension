
export const strippedHost = () => {
    let host = location.host;

    // Replacing www. only if the domain starts with it.
    if(host.indexOf('www.') === 0) host = host.replace('www.', '');

    return host;
};

export const strippedFavicon = () => {
    let favicon = undefined;
    let size = 0
    let nodeList = document.getElementsByTagName("link");
    for (let i = 0; i < nodeList.length; i++)
    {
      if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
      {
        if(nodeList[i].sizes[0]){
          const newSize = nodeList[i].sizes[0].split('x')[1]
          if(newSize && newSize> size){
            size = newSize
            favicon = nodeList[i].getAttribute("href");
          }else if(!favicon){
            favicon = nodeList[i].getAttribute("href");
          }
        }else if(!favicon){
          favicon = nodeList[i].getAttribute("href");
        }
      }
    }

    if(favicon && favicon.substring(0,1) === '/'){
      favicon = location.origin + favicon;
    }

    return favicon;
};

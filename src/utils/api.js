export const callApi = async (url, options = {method: 'GET'}) => {
  const {json = true} = options
  // let headers = {
  //   'Authorization': `Bearer ${this.props.token}`
  // }
  let headers = {}

  if(json){
    headers = {
      ...headers,
      Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  }else{
    if(options.body){
      let formBody = new FormData();
      for ( var key in options.body ) {
        formBody.append(key, options.body[key]);
      }

      options.body = formBody;
    }
  }

  try{
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`,{
      ...options,
      headers
    })

    const body = await response.json()

    return {
      status: response.status,
      body
    }
  }catch(e){
    //  Return to login page if the request fail with 401
    if(e.status === 401){
      alert(e.message)
    }else{
      throw e.message
    }
  }
}
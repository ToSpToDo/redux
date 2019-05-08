/**
 *  模拟ajax请求
 * @param params
 * @returns {Promise<any>}
 */
export default function ajax(params = {}) {
  let isPromise = params.async || !params.callback;
  let _callback = params.callback || function (data, code, msg) {
    console.log(data, code, msg)
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        isPromise ? resolve({data: params.data, code: 100, msg: 'success'}) : _callback(params.data, 100, 'success')
      } else {
        isPromise ? reject({data: params.data, code: 0, msg: 'err'}) : _callback(params.data, 0, 'err')
      }
    }, 2000)

  })


}

var recastai = require('recastai').default

// var request = new recastai.request('675abd490d20f12bf5a574bf4bd67760', 'en')

// request.analyseText('create repo tunnel')
//   .then(function(res) {
//     console.log(res.raw)
//   })

  var build = new recastai.build('675abd490d20f12bf5a574bf4bd67760', 'en')

  build.dialog({ type: 'text', content: 'create repo tunnel'}, { conversationId: 'CONVERSATION_ID' })
    .then(function(res) {
      console.log("saflkjsd: ",res)
    })  

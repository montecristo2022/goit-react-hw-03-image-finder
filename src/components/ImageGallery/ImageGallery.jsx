



import React, { Component } from 'react'

export default class ImageGallery extends Component {




  render() {
    return (
        <>
        <ul>
          {this.props.hits.map(oneHit => {
            return (
              <li key={oneHit.id}>
                <img src={oneHit.largeImageURL} alt="" width='400' height='400'/>
              </li>
            );
          })}
        </ul>
     </>
    )
  }
}











// export default function ImageGallery(hits, page) {
 
    
  


//   return (
//  <>
//     <ul>
//       {hits.hits.map(oneHit => {
//         return (
//           <li key={oneHit.id}>
//             <img src={oneHit.largeImageURL} alt="" width='400' height='400'/>
//           </li>
//         );
//       })}
//     </ul>

//     <button onClick={loadMore}>Загрузить еще</button>
//  </>

//   );
// }


// function loadMore () {
  

// }
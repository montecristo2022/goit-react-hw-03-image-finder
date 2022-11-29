import PropTypes from 'prop-types';

import styles from '../ButtnoLoadMore/ButtonLoadMore.module.css';

export default function ButtonLoadMore({ onClick }) {
  return (
    <button className={styles.buttonLoadMore} type="button" onClick={onClick}>
      Загрузить еще картинок...
    </button>
  );
}

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};









































// import PropTypes from 'prop-types';

// import React, { Component } from 'react';
// import styles from '../ButtnoLoadMore/ButtonLoadMore.module.css';

// export default class ButtonLoadMore extends Component {
//   render() {
//     return (
//       <button
//         className={styles.buttonLoadMore}
//         type="button"
//         onClick={this.props.onClick}
//       >
//         Загрузить еще картинок...
//       </button>
//     );
//   }
// }

// ButtonLoadMore.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

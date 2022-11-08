window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.entrance_form');
  const button = document.querySelector('.submitButton');

  const mapErrorToUi = (errorMessages) => {
    errorMessages.forEach((error) => {
      const errorElementContainer = document.querySelector(
        `.error-${error.property}`,
      );
      Object.values(error.constraints).forEach((errorMessage) => {
        errorElementContainer.insertAdjacentHTML(
          'beforeend',
          `
          <p class="error-message">* ${errorMessage}</p>
          `,
        );
      });
    });
  };

  const clearAllError = () => {
    const errorNodes = document.querySelectorAll('.error-message');
    errorNodes.forEach((node) => {
      const parentNode = node.parentNode;
      parentNode.removeChild(node);
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAllError();
    const formDatas = new FormData(form);

    button.disabled = true;
    button.textContent = 'uploading ...';

    try {
      await axios.post('/admission', formDatas, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('form uploaded successfully ...');
      window.location.href = '/';
    } catch (err) {
      button.disabled = false;
      button.textContent = 'submit';
      if (err.response) {
        if (err.response.data.error === 'Unauthorized') {
          document.querySelector('.error-studentEmail').insertAdjacentHTML(
            'beforeend',
            `
          <p class="error-message">* Email already exists. Try another</p>
          `,
          );
          return;
        }
        mapErrorToUi(err.response.data.message);
      } else {
        alert('something went wrong please try again !');
      }
    }
  });
});

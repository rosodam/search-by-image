import {findNode, processNode} from 'utils/common';
import {setFileInputData, initSearch, sendReceipt} from 'utils/engines';

const engine = 'tmview';

async function search({session, search, image, storageIds}) {
  // previous search may be cached
  processNode(
    '.image-remove button',
    function (node) {
      if (node && !document.querySelector('.area-selection')) {
        node.click();
      }
    },
    {throwError: false}
  );

  const inputSelector = 'input[type=file]';
  const input = await findNode(inputSelector);

  await setFileInputData(inputSelector, input, image);

  input.dispatchEvent(new Event('change', {bubbles: true}));

  await findNode('.image-tools');

  await sendReceipt(storageIds);

  (await findNode('button[data-test-id=search-button]')).click();
}

function init() {
  initSearch(search, engine, taskId);
}

init();

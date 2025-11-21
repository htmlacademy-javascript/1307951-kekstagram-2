const SHOW_STEP = 5;
const bigPictureElement = document.querySelector('.big-picture');
const socialCommentTemplate = bigPictureElement.querySelector('.social__comment');
// показывает, сколько элементов загружено
const socialCommentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
// показывает, сколькло элементов всего
const socialCommentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
// список, куда добавляются элементы комментариев
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
// кнопка загрузки комментариев
const socialCommentsLoader = bigPictureElement.querySelector('.social__comments-loader');

// фрагмент, куда добавляются комментарии загруженные
const socialCommentFragment = document.createDocumentFragment();

let some = 0;
/** в этой функции передается обрезанный массив объектов
 * длиной shwo_step
 */

function createCommentListFragment(comments) {
  comments.forEach(({id: commentId, avatar, message, name}) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.dataset.commentId = commentId;
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.querySelector('.social__picture').alt = name;
    socialCommentFragment.append(commentElement);
  });
  return socialCommentFragment;
}
// обновляем массив
function addCommentAssistent(allCommentsArray) {
  const allComments = allCommentsArray;
  const commentsArrayLength = allComments.length;
  let loadedComments = SHOW_STEP;

  // по умолчанию в эту функцию идут массивы длинной больше 5
  // поэтому проверять не надо

  function loadNewCommens() {
    const difference = commentsArrayLength - loadedComments;
    if ((difference / SHOW_STEP) >= 1) {
      socialCommentsElement.appendChild(createCommentListFragment(allComments.slice(loadedComments, loadedComments + SHOW_STEP)));
      loadedComments += SHOW_STEP;
    } else {
      socialCommentsElement.appendChild(createCommentListFragment(allComments.slice(-difference)));
      loadedComments += difference;
      // socialCommentsLoader.removeEventListener('pointerdown', addMoreComments);
      clearCommentsEvent();
      socialCommentsLoader.classList.add('hidden');
    }
    socialCommentShownCountElement.textContent = loadedComments;
  }
  return loadNewCommens;
}

function addMoreComments (evt) {
  evt.preventDefault();
  some();
}

function clearCommentsEvent () {
  socialCommentsLoader.removeEventListener('pointerdown', addMoreComments);
}
function addCommentsEvent() {
  socialCommentsLoader.addEventListener('pointerdown', addMoreComments);
}

// первый раз добавляем элементы
function createCommentList(comments) {
  socialCommentShownCountElement.textContent = 0;
  socialCommentsElement.querySelectorAll('li').forEach((el) => {
    el.remove();
  });
  socialCommentTotalCountElement.textContent = comments.length;

  if (comments.length) {
    if (comments.length < SHOW_STEP) {
      socialCommentShownCountElement.textContent = comments.length;
      socialCommentsElement.appendChild(createCommentListFragment(comments));
      // мало комментариев,  поэтому не добавляем обработчик, кнопку показа скрываем
      socialCommentsLoader.classList.add('hidden');
    } else {
      socialCommentShownCountElement.textContent = SHOW_STEP;
      socialCommentsElement.appendChild(createCommentListFragment(comments.slice(0, SHOW_STEP)));
      some = addCommentAssistent(comments);
      // добавляем обработчик событий к кнопке
      addCommentsEvent();
      socialCommentsLoader.classList.remove('hidden');
    }
  } else {
    socialCommentsLoader.classList.add('hidden');
  }
}

export {createCommentList, clearCommentsEvent};

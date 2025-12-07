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

let getNewComments = 0;
/** в этой функции передается обрезанный массив объектов
 * длиной shwo_step
 */

const createCommentListFragment = (comments) => {
  comments.forEach(({id: commentId, avatar, message, name}) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.dataset.commentId = commentId;
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.querySelector('.social__picture').alt = name;
    socialCommentFragment.append(commentElement);
  });
  return socialCommentFragment;
};

const onCommentsLoaderButtonPointerdown = (evt) => {
  evt.preventDefault();
  getNewComments();
};

const clearCommentsEvent = () => {
  socialCommentsLoader.removeEventListener('pointerdown', onCommentsLoaderButtonPointerdown);
};

const addCommentAssistent = (allCommentsArray) => {
  const allComments = allCommentsArray;
  const commentsArrayLength = allComments.length;
  let loadedComments = SHOW_STEP;

  return () => {
    const difference = commentsArrayLength - loadedComments;
    if ((difference / SHOW_STEP) >= 1) {
      socialCommentsElement.appendChild(createCommentListFragment(allComments.slice(loadedComments, loadedComments + SHOW_STEP)));
      loadedComments += SHOW_STEP;
    } else {
      socialCommentsElement.appendChild(createCommentListFragment(allComments.slice(-difference)));
      loadedComments += difference;
      clearCommentsEvent();
      socialCommentsLoader.classList.add('hidden');
    }
    socialCommentShownCountElement.textContent = loadedComments;
  };
};


const addCommentsEvent = () =>{
  socialCommentsLoader.addEventListener('pointerdown', onCommentsLoaderButtonPointerdown);
};

const createCommentList = (comments) => {
  socialCommentShownCountElement.textContent = 0;
  socialCommentsElement.querySelectorAll('li').forEach((el) => {
    el.remove();
  });
  socialCommentTotalCountElement.textContent = comments.length;

  if (comments.length) {
    if (comments.length < SHOW_STEP) {
      socialCommentShownCountElement.textContent = comments.length;
      socialCommentsElement.appendChild(createCommentListFragment(comments));
      socialCommentsLoader.classList.add('hidden');
    } else {
      socialCommentShownCountElement.textContent = SHOW_STEP;
      socialCommentsElement.appendChild(createCommentListFragment(comments.slice(0, SHOW_STEP)));
      getNewComments = addCommentAssistent(comments);
      addCommentsEvent();
      socialCommentsLoader.classList.remove('hidden');
    }
  } else {
    socialCommentsLoader.classList.add('hidden');
  }
};

export {createCommentList, clearCommentsEvent};

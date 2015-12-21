function setupCards() {
  var stack, cards;

  cards = [].slice.call(document.querySelectorAll('#swipe-demo ul li'));

  stack = gajus.Swing.Stack();
  cards.forEach(function(targetElement) {
    stack.createCard(targetElement);
    targetElement.classList.add('in-deck');
  });

  stack.on('throwout', function (e) {
    e.target.classList.remove('in-deck');
    console.log('Card has been throw out of the stack.');
    console.log('Throw direction: ' + (e.throwDirection == -1 ? 'left' : 'right'));
  });
};

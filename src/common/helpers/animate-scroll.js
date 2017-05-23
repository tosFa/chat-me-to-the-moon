/** 
 * Smooth scrolling implementation.
 */

const noop = () => {};

/**
 * Standard easing functions set.
 * @param {Number} t Current time.
 * @param {Number} b Start value.
 * @param {Number} c Change in value.
 * @param {Number} d Duration.
 */
const easingsByName = {
  linearTween: (t, b, c, d) => c * t / d + b,
  easeInQuad: (t, b, c, d) => {
    let T = t;
    T /= d;
    return c * T * T + b;
  },
  easeInExpo: (t, b, c, d) => c * Math.pow(2, 10 * (t / d - 1)) + b,
  easeOutExpo: (t, b, c, d) => {
    const res = (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    return res;
  },
};

/**
 * Round number with pads.
 * @param {Number} value Value to round.
 * @param {Number} [pad=2] Count of signs after a dot.
 * @returns {Number} Rounded value.
 */
const round = (value, pad = 2) => Math.round(value * pad * 10) / pad / 10;

/**
 * Start animation function
 * @param {Object} [options] Composite start animation options.
 * @param {Number} startValue Start animation value.
 * @param {Number} endValue End animation value.
 * @param {Function} setValueFn value setter function.
 * @param {Number} duration Animation duration im milliseconds
 * @param {Function} [easingFn] Standart easing function.
 * @returns {Function} Stop function.
 */
const startAnimation = (options) => {
  const o = { ...options, ...{ easingFn: easingsByName.linearTween } };

  const { startValue, endValue, duration, setValueFn, easingFn } = o;
  let isStopped = false;
  const deltaTime = Date.now();

  const animateStep = () => {
    if (isStopped) {
      return;
    }

    const currTime = Math.min(Date.now() - deltaTime, duration);
    const currValue = easingFn(currTime, startValue, endValue - startValue, duration);

    setValueFn(currValue);

    if (currValue === endValue) {
      return;
    }

    requestAnimationFrame(() => {
      animateStep();
    });
  };

  animateStep();

  return function stop() {
    isStopped = true;
  };
};

/**
 * Animate scroll main function.
 * @param {Object} [options] Composite animation options.
 * @param {Number} [options.endValue=0] End point of animation.
 * @param {Number} [options.offset=0] End value offset.
 * @param {Number} [options.duration=500] Animation duration.
 * @param {String|Function} [options.easing=easeInExpo]
 * Easing function or one of possible names: easeInExpo, easeOutExpo.
 * @param {HTMLElement} [options.containerNode=document.body] Scroll property node.
 * @param {HTMLElement} [options.toNode] The node where it will scroll.
 * @param {String} [options.scrollKey=scrollTop] Scroll property of node to animate.
 * @returns {Function} Stop function.
 */
const animateScroll = (options) => {
  const o = { ...options, ...{
    endValue: 0,
    offset: 0,
    duration: 500,
    easing: 'linearTween',
    containerNode: (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) ?
      document.body : document.documentElement,
    scrollKey: 'scrollTop',
  } };

  const { containerNode, toNode } = o;
  let { scrollKey, easing, endValue } = o;

  if (toNode === null) {
    return noop;
  }

  if (typeof easing === 'string') {
    easing = easingsByName[o.easing];
  }

  if (containerNode[scrollKey] === undefined) {
    scrollKey = 'scrollTop';
  }

  if (toNode) {
    endValue = containerNode[scrollKey] + toNode.getBoundingClientRect().top;
  }

  endValue += o.offset;

  return startAnimation({
    startValue: containerNode[scrollKey],
    endValue,
    setValueFn: value => (containerNode[scrollKey] = round(value, 2)),
    easingFn: easing,
    duration: o.duration,
  });
};

/**
 * Animate scroll top proxy.
 * @param {Object} [options] Composite animation options.
 * @param {Number} [options.endValue=0] End point of animation.
 * @param {Number} [options.offset=0] End value offset.
 * @param {Number} [options.duration=500] Animation duration.
 * @param {String|Function} [options.easing=easeInExpo]
 * Easing function or one of possible names: easeInExpo, easeOutExpo.
 * @param {HTMLElement} [options.containerNode=document.body] Scroll property node.
 * @returns {Function} Stop function.
 */
export const animateScrollTop = options => animateScroll({
  ...options,
  scrollKey: 'scrollTop',
});

/**
 * Animate scroll left proxy.
 * @param {Object} [options] Composite animation options.
 * @param {Number} [options.endValue=0] End point of animation.
 * @param {Number} [options.offset=0] End value offset.
 * @param {Number} [options.duration=500] Animation duration.
 * @param {String|Function} [options.easing=easeInExpo]
 * Easing function or one of possible names: easeInExpo, easeOutExpo.
 * @param {HTMLElement} [options.containerNode=document.body] Scroll property node.
 * @returns {Function} Stop function.
 */
export const animateScrollLeft = options => animateScroll({
  ...options,
  scrollKey: 'scrollLeft',
});

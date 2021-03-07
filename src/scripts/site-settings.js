const header = (() => {
  const accessibilityContainer = document.querySelector(
    '#accessibility-container'
  );
  const animationSwitch = document.querySelector('#animation-switch');
  const soundSwitch = document.querySelector('#sound-switch');
  const themeSwitch = document.querySelector('#theme-switch');

  return {
    accessibilityContainer,
    animationSwitch,
    soundSwitch,
    themeSwitch,
  };
})();

const siteStorage = (() => {
  const saveToLocal = () => {
    localStorage.setItem(
      'theme',
      document.documentElement.getAttribute('theme')
    );

    localStorage.setItem(
      'animations-enabled',
      header.animationSwitch.getAttribute('aria-checked')
    );

    localStorage.setItem(
      'sound-enabled',
      header.soundSwitch.getAttribute('aria-checked')
    );
  };

  return {
    saveToLocal,
  };
})();

const displayOptions = (() => {
  const _onLoad = () => {
    if (localStorage.getItem('theme') === 'light') {
      _lightTheme();
    } else {
      _darkTheme();
    }
  };

  const _toggleTheme = (e) => {
    if (document.documentElement.getAttribute('theme') === 'light') {
      _darkTheme();
    } else {
      _lightTheme();
    }
    siteStorage.saveToLocal();
  };

  const _darkTheme = () => {
    header.themeSwitch.setAttribute('aria-checked', 'false');
    document.documentElement.setAttribute('theme', 'dark');
    header.themeSwitch.style.backgroundPosition = 'center bottom -0.8rem';
  };

  const _lightTheme = () => {
    header.themeSwitch.setAttribute('aria-checked', 'true');
    document.documentElement.setAttribute('theme', 'light');
    header.themeSwitch.style.backgroundPosition = 'center top 2px';
  };

  header.themeSwitch.addEventListener('click', _toggleTheme);
  header.themeSwitch.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      _toggleTheme();
    }
  });

  window.addEventListener('load', _onLoad);
})();

const accessibilityOptions = (() => {
  const _onLoad = () => {
    if (localStorage.getItem('animations-enabled') === 'false') {
      _animationsDisabled();
    } else {
      _animationsEnabled();
    }
    if (localStorage.getItem('sound-enabled') === 'false') {
      _soundDisabled();
    } else {
      _soundEnabled();
    }
  };

  const _toggleAnimations = () => {
    if (header.animationSwitch.getAttribute('aria-checked') === 'true') {
      _animationsDisabled();
    } else {
      _animationsEnabled();
    }
    siteStorage.saveToLocal();
  };

  const _animationsEnabled = () => {
    document.documentElement.style.scrollBehavior = 'smooth';
    header.accessibilityContainer.style.transition = 'top 0.75s ease-in-out';
    header.animationSwitch.setAttribute('aria-checked', 'true');
    header.animationSwitch.textContent = 'Animations Enabled';
    header.themeSwitch.style.transition = 'background-position 0.3s ease-in';
    Array.from(document.querySelectorAll('.label-arrow')).forEach((item) => {
      item.style.transition = 'transform 0.75s';
    });
  };

  const _animationsDisabled = () => {
    document.documentElement.style.scrollBehavior = 'unset';
    header.animationSwitch.setAttribute('aria-checked', 'false');
    header.animationSwitch.textContent = 'Animations Disabled';
    Array.from(document.querySelectorAll('.animated')).forEach((item) => {
      item.style.transition = 'none';
    });
  };

  header.animationSwitch.addEventListener('click', _toggleAnimations);
  header.animationSwitch.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      _toggleAnimations();
    }
  });

  const _toggleSound = () => {
    if (header.soundSwitch.getAttribute('aria-checked') === 'true') {
      _soundDisabled();
    } else {
      _soundEnabled();
    }
    siteStorage.saveToLocal();
  };

  const _soundEnabled = () => {
    header.soundSwitch.setAttribute('aria-checked', 'true');
    header.soundSwitch.style.backgroundImage = 'var(--sound-on-icon)';
  };

  const _soundDisabled = () => {
    header.soundSwitch.setAttribute('aria-checked', 'false');
    header.soundSwitch.style.backgroundImage = 'var(--sound-off-icon)';
  };

  header.soundSwitch.addEventListener('click', _toggleSound);
  header.soundSwitch.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      _toggleSound();
    }
  });

  window.addEventListener('load', _onLoad);
})();

export { siteStorage, displayOptions, accessibilityOptions };

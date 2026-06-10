<script lang="ts">
  import { locale, theme } from '$lib/settings';

  const labels = {
    en: { home: 'Home', projects: 'Projects', other: 'Other'},
    et: { home: 'Avaleht', projects: 'Projektid', other: 'Muu' }
  };
</script>

<nav class="navbar">
  <div class="nav-inner">
    <div class="left">
      <a href="/fox"><img src="/fox.png" alt="Logo" width="30" height="30" /></a>
      <div class="nav-links">
        <a href="/">{ $locale === 'en' ? labels.en.home : labels.et.home }</a>
        <a href="/projects">{ $locale === 'en' ? labels.en.projects : labels.et.projects }</a>
        <a href="/other">{ $locale === 'en' ? labels.en.other : labels.et.other }</a>
      </div>
    </div>

    <div class="controls">
      <button class="theme-toggle" on:click={() => theme.set($theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
        { $theme === 'light' ? '🌙' : '☀️' }
      </button>

      <button class="theme-toggle" on:click={() => locale.set($locale === 'en' ? 'et' : 'en')} aria-label="Toggle language">
        { $locale === 'en' ? 'EE' : 'EN' }
      </button>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: hsl(0, 0%, 25%);
    color: white;
  }

  .nav-inner {
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nav-links {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 6px;
    display: inline-block;
  }

  .nav-links a:hover { background-color: hsl(0, 0%, 10%); }

  .controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .theme-toggle {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    color: white;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
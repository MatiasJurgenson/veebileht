<script lang="ts">
  import { locale } from '$lib/settings';

  const text = {
    en: '© 2026 All rights reserved.',
    et: '© 2026 Kõik õigused kaitstud.'
  };
</script>

<footer class="footer">
  <div class="footer-inner">
    <p>{ $locale === 'en' ? text.en : text.et }</p>

    <ul class="social">
      <li><a href="https://github.com/MatiasJurgenson" target="_blank" rel="noopener noreferrer"><img src="/github.svg" alt="GitHub" width="24" height="24" /></a></li>
      <li><a href="https://www.linkedin.com/in/matias-j%C3%BCrgenson-8147aa28b/" target="_blank" rel="noopener noreferrer"><img src="/linkedin.svg" alt="LinkedIn" width="24" height="24" /></a></li>
    </ul>
  </div>
</footer>

<style>
  .footer {
    background-color: hsl(0, 0%, 25%);
    color: white;
  }

  .footer-inner {
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .social {
    display: flex;
    gap: 12px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .social img { display: block; }
</style>
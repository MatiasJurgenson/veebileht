<script lang="ts">
  import { locale } from '$lib/settings';

  const labels = {
    en: { title: 'Matias', subtitle: 'professional idiot', surname: 'Jürgenson' },
    et: { title: 'Matias', subtitle: 'professionaalne idioot', surname: 'Jürgenson' }
  };
</script>

<section class="hero">
  <img class="hero-image" src="/wires.jpg" alt="Abstract wires" />
  <div class="hero-copy">
    <span>{ $locale === 'en' ? labels.en.title : labels.et.title }</span>
    <span>"{ $locale === 'en' ? labels.en.subtitle : labels.et.subtitle }"</span>
    <span>{ $locale === 'en' ? labels.en.surname : labels.et.surname }</span>
  </div>
</section>

<style>

  .hero {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
  }

  .hero-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-copy {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    gap: 0.25rem;
    text-align: center;
    color: white;
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 700;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.65);
    padding: 1rem;
  }

  .hero-copy > span {
    justify-self: center;
    width: fit-content;
    padding: 0.15rem 0.6rem;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 0.5rem;
  }
</style>
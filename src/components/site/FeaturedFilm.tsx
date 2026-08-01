'use client';

import Image from 'next/image';
import { Film, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import styles from './Site.module.css';

const chapterVideoId = 'z5kNEvZ_MMM';
const chapterPoster =
  '/Imgs/magnific_create-a-premium-closeup-_Uy5rPHSwny.png';

export function FeaturedFilm() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const closeDialog = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <ScrollReveal className={styles.filmPosterReveal} delay={100}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.filmPoster}
          onClick={() => setOpen(true)}
          aria-label="Play the 9 Muse Customs featured film"
        >
          <Image
            src={chapterPoster}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 430px"
            className={styles.galleryImage}
          />
          <span className={styles.filmScrim} aria-hidden="true" />
          <span className={styles.playButton}>
            <Play aria-hidden size={27} fill="currentColor" />
          </span>
          <span className={styles.filmLabel}>
            <Film aria-hidden size={16} />
            Watch the film
          </span>
        </button>
      </ScrollReveal>

      <dialog
        ref={dialogRef}
        className={styles.videoDialog}
        aria-labelledby="video-dialog-title"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            closeDialog();
          }
        }}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeDialog();
          }
        }}
      >
        <div className={styles.dialogPanel}>
          <div className={styles.dialogHeader}>
            <h2 id="video-dialog-title">9 Muse Customs Film</h2>
            <button
              ref={closeRef}
              type="button"
              onClick={closeDialog}
              aria-label="Close featured film"
            >
              <X aria-hidden size={20} />
            </button>
          </div>
          <div className={styles.dialogVideo}>
            {open ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${chapterVideoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title="9 Muse Customs featured film"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}

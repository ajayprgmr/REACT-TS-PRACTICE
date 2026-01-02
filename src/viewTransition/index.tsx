import { useState, ViewTransition, useTransition } from 'react';
import './viewTransition.css';

const POSTER_IMG =
  'https://occ-0-2857-2164.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABYza4Bc8BiFx9fnItZp5-wMNK7sMaB5f26sNxPXEKVO73SnjmArfY-9jmsXjctOkqDopJRYhHvGJ6xSwO9ui6T-mPQyzrIuAoo0.jpg?r=880';

function ViewTransitionDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const openModal = () => {
    startTransition(() => setIsOpen(true));
  };

  const closeModal = () => {
    startTransition(() => setIsOpen(false));
  };

  return (
    <ViewTransition>
      <div className="view-transition-main">
        {/* CARD */}
        {!isOpen && (
          <div onClick={openModal} className="view-t-card">
            <img
              src={POSTER_IMG}
              alt="poster"
              style={{ viewTransitionName: 'poster' }}
            />
          </div>
        )}

        {/* MODAL */}
        {isOpen && (
          <div className="modal-container">
            <div className="modal-hero">
              <img
                src={POSTER_IMG}
                alt="poster"
                className="modal-hero-img"
                style={{ viewTransitionName: 'poster' }}
              />

              <div className="modal-hero-content">
                <h1 className="modal-hero-title">
                  Welcome to the Experience
                </h1>
                <p className="modal-hero-subtitle">
                  Transitions that feel natural and powerful.
                </p>
              </div>
            </div>

            <div className="modal-body">
              <h2>This is From Modal</h2>
              <p>
                Discover next-gen UI behavior with smooth state changes and
                responsive layouts. View Transitions remove the need for
                complex animation logic.
              </p>
              <p>
                This interaction uses a shared element that morphs between
                layouts — the same technique used by Netflix and Apple TV.
              </p>

              <button className="modal-close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </ViewTransition>
  );
}

export default ViewTransitionDemo;

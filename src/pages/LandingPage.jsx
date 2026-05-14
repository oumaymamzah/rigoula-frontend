import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Spinner, Tabs, Tab, Modal } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext.jsx';
import api from '../services/api';
import { resolveMediaUrl } from '../utils/media';

const LandingPage = () => {
  const { settings } = useSettings();
  const [events, setEvents] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Refs pour les sections
  const homeRef = useRef(null);
  const presentationRef = useRef(null);
  const eventsRef = useRef(null);

  // ==================== DONNÉES DE CONFIGURATION ====================
  
  // Histoire par défaut (modifiable par l'admin via settings)
  const defaultHistory = `2017 : Les débuts
Mouna Triki Lamine, designer de formation, décide de changer de vie. Elle crée une petite ferme dans son jardin pour cultiver des légumes bio, sans produits chimiques.

2021 : On grandit
Face au succès, RIGOULA s'installe sur un terrain de 2 hectares à Bir Mallouli.

2022 : La reconnaissance
Certification bio ECOCERT
Médaille de bronze au concours national des produits du terroir tunisiens.

Aujourd'hui
RIGOULA propose des légumes bio et des produits artisanaux faits selon des recettes traditionnelles : hrous (médaille d'or), tomates séchées (médaille d'argent), hrissa, sauces et légumes marinés.

Notre engagement
Nous formons les femmes de la région et protégeons l'environnement avec une agriculture 100% naturelle.

Demain
RIGOULA se prépare à conquérir les marchés internationaux pour faire découvrir le savoir-faire tunisien au monde entier.`;

  // Configuration de la timeline
  const timelineData = [
    {
      id: 1,
      year: '2017',
      title: 'La naissance de RIGOULA',
      color: '#047857'
    },
    {
      id: 2,
      year: '2021',
      title: 'Expansion et croissance',
      color: '#10b981'
    },
    {
      id: 3,
      year: '2022',
      title: 'Certification et excellence',
      color: '#f59e0b'
    },
    {
      id: 4,
      year: '2024',
      title: 'Récompenses nationales',
      color: '#10b981'
    },
    {
      id: 5,
      year: '✓',
      title: 'Aujourd\'hui - Une gamme authentique',
      color: '#16a34a'
    }
  ];

  // Configuration des valeurs
  const valuesData = [
    {
      id: 1,
      icon: '✨',
      title: 'Qualité',
      description: 'Sélection rigoureuse pour la meilleure qualité',
      delay: '0s'
    },
    {
      id: 2,
      icon: '🌱',
      title: 'Durabilité',
      description: 'Agriculture respectueuse de l\'environnement',
      delay: '0.15s'
    },
    {
      id: 3,
      icon: '🤝',
      title: 'Confiance',
      description: 'Relations durables basées sur la transparence',
      delay: '0.3s'
    },
    {
      id: 4,
      icon: '❤️',
      title: 'Passion',
      description: 'Dévouement à l\'excellence et l\'innovation',
      delay: '0.45s'
    }
  ];



  // ==================== FONCTIONS UTILITAIRES ====================

  const formatHistoryText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // ==================== HOOKS ====================

  useEffect(() => {
    fetchData();
    handleScrollNavigation();
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleScrollNavigation);
    return () => window.removeEventListener('hashchange', handleScrollNavigation);
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, certsRes] = await Promise.all([
        api.get('/evenements'),
        api.get('/certifications')
      ]);
      setEvents(eventsRes.data.data);
      setCertifications(certsRes.data.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollNavigation = () => {
    const hash = window.location.hash.slice(1);
    let targetRef = homeRef;

    if (hash === 'presentation') targetRef = presentationRef;
    else if (hash === 'evenements') targetRef = eventsRef;

    if (targetRef.current) {
      setTimeout(() => {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) >= new Date();
  };

  const handleViewImage = (item) => {
    setSelectedCert(item);
    setCurrentImageIndex(0);  // Réinitialiser à la première image
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCert(null);
    setCurrentImageIndex(0);  // Réinitialiser l'index
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = (totalImages) => {
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // ==================== COMPOSANTS RÉUTILISABLES ====================
  // ValueCard composant commenté - unused
  // const ValueCard = ({ icon, title, description, delay }) => (
  //   <div className="value-card-modern">
  //     <div className="value-card-header">
  //       <span className="value-icon">{icon}</span>
  //     </div>
  //     <h5 className="fw-bold mb-3">{title}</h5>
  //     <p className="text-muted small">{description}</p>
  //   </div>
  // );

  // ==================== RENDER ====================

  return (
    <div>
      {/* ===================== SECTION HOME ===================== */}
      <section ref={homeRef} id="home" className="hero-section-enhanced py-5 fade-in-section">
        <Container className="py-5">
          <Row className="align-items-center min-vh-70">
            <Col lg={6} className="text-white mb-4 mb-lg-0">
              <div className="hero-content">
                <h1 className="hero-title display-2 fw-bold mb-4 slide-down" style={{ animationDelay: '0.1s' }}>
                  {settings.hero_title || 'Bienvenue chez Rigoula'}
                </h1>
                <p className="hero-subtitle fs-5 mb-5 slide-down" style={{ animationDelay: '0.2s' }}>
                  {settings.hero_subtitle || 'Des produits agricoles biologiques frais et de qualité supérieure'}
                </p>
                <div className="hero-cta slide-down" style={{ animationDelay: '0.3s' }}>
                  <Link to="/produits">
                    <Button className="hero-btn-modern fw-bold px-6 py-3 me-3">
                      Découvrir nos produits
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center zoom-in" style={{ animationDelay: '0.4s' }}>
              <div className="hero-graphic">
                {settings.site_logo && (
                  <div className="floating-element">
                    {settings.site_logo.startsWith('http') || settings.site_logo.startsWith('data:image/') || settings.site_logo.includes('/uploads') || settings.site_logo.startsWith('/api/') ? (
                      <img 
                        src={resolveMediaUrl(settings.site_logo)} 
                        alt="Logo Rigoula" 
                        style={{ 
                          maxWidth: '300%', 
                          maxHeight: '600px', 
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 4px 15px rgba(0, 0, 0, 0.2))'
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: '200px', lineHeight: '1' }}>
                        {settings.site_logo}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===================== SECTION FEATURES ===================== */}
      <section className="features-section-enhanced py-5 fade-in-section">
        <Container className="px-3">
          <div className="section-header text-center mb-5">
            <h2 className="section-title slide-down" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}>Pourquoi choisir Rigoula ?</h2>
            <div className="title-underline"></div>
          </div>
          <Row className="g-3 g-md-4">
            <Col xs={12} md={4} className="feature-card-wrapper slide-up" style={{ animationDelay: '0s' }}>
              <div className="feature-card-simple">
                <div className="feature-icon-modern" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>🍊</div>
                <h3 className="fw-bold mb-2" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Produits Frais</h3>
                <p className="text-muted small" style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>
                  Récoltés chaque jour pour votre santé
                </p>
              </div>
            </Col>
            <Col xs={12} md={4} className="feature-card-wrapper slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="feature-card-simple feature-card-highlight">
                <div className="feature-icon-modern" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>🌿</div>
                <h3 className="fw-bold mb-2" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>100% Biologique</h3>
                <p className="text-muted small" style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>
                  Cultivé naturellement sans produits chimiques
                </p>
              </div>
            </Col>
            <Col xs={12} md={4} className="feature-card-wrapper slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="feature-card-simple">
                <div className="feature-icon-modern" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>🚚</div>
                <h3 className="fw-bold mb-2" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Livraison Rapide</h3>
                <p className="text-muted small" style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>
                  Livraison en 24 à 48h dans toute la Tunisie
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===================== SECTION PRESENTATION ===================== */}
      <section ref={presentationRef} id="presentation" className="presentation-section-enhanced py-5 fade-in-section">
        <Container className="px-3 px-md-0">
          {/* En-tête */}
          <div className="section-header text-center mb-5">
            <div className="section-badge slide-down">
              <span>À Propos</span>
            </div>
            <h2 className="section-title fw-bold mb-3 slide-down" style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', animationDelay: '0.1s' }}>
              {settings.about_title || 'À propos de Rigoula'}
            </h2>
            <p className="section-subtitle text-muted slide-down" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.1rem)', animationDelay: '0.2s' }}>
              {settings.site_description || 'Votre partenaire de confiance en agriculture biologique'}
            </p>
            <div className="title-underline"></div>
          </div>

        {/* Notre Histoire — 2 colonnes */}
<section className="story-section-modern mb-5">
  <Row className="align-items-start g-4 g-md-5">

    {/* COLONNE GAUCHE — Texte */}
    <Col xs={12} lg={6} className="slide-up">
      <div className="story-content-modern">
        <h3 className="story-title fw-bold mb-4" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>Notre Histoire</h3>
        <div 
          className="story-text text-muted mb-4"
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)',
            lineHeight: '1.8',
            letterSpacing: '0.3px',
            fontWeight: '500'
          }}
        >
          {formatHistoryText(settings.about_description || defaultHistory)}
        </div>
      </div>
    </Col>

    {/* COLONNE DROITE — Photo */}
    <Col xs={12} lg={6} className="slide-up" style={{ animationDelay: '0.2s' }}>
      {settings.presentation_image ? (
        <img
          src={resolveMediaUrl(settings.presentation_image)}
          alt="Notre histoire - Rigoula"
          style={{
            width: '100%',
            height: 'auto',
            minHeight: '300px',
            maxHeight: '500px',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            display: 'block',
            marginTop: '2rem'
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          minHeight: '300px',
          background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
          borderRadius: '20px',
          border: '2px dashed #10b981',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>🌿</span>
          <p className="text-muted mt-3 fw-semibold" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
            Photo à ajouter depuis l'espace admin
          </p>
        </div>
      )}
    </Col>

  </Row>

  {/* TIMELINE — En dessous sur toute la largeur */}
  <Row className="mt-5">
    <Col lg={12}>
      <div className="story-timeline" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        {timelineData.map((item) => (
          <div 
            key={item.id} 
            className="timeline-item" 
            style={{ 
              flex: '1',
              minWidth: '90px',
              textAlign: 'center',
              padding: '0.5rem'
            }}
          >
            <div
              className="timeline-marker"
              style={{
                background: item.color,
                color: 'white',
                fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                fontWeight: 'bold',
                margin: '0 auto 0.5rem auto',
                padding: '0.5rem 0.75rem',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {item.year}
            </div>
            <p style={{
              fontWeight: '600',
              color: item.color,
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              margin: '0',
              lineHeight: '1.3'
            }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </Col>
  </Row>

</section>

          {/* Nos Valeurs */}
          <section className="values-section-modern mb-5">
            <h3 className="section-title text-center fw-bold mb-5 slide-down" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>Nos Valeurs Fondamentales</h3>
            <Row className="g-3 g-md-4">
              {valuesData.map((value) => (
                <Col 
                  key={value.id} 
                  xs={12}
                  md={6} 
                  lg={3} 
                  className="slide-up" 
                  style={{ animationDelay: value.delay }}
                >
                  <div className="value-card-modern">
                    <div className="value-card-header">
                      <span className="value-icon" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>{value.icon}</span>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>{value.title}</h5>
                    <p className="text-muted small" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{value.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </section>
        </Container>
      </section>

       {/* ===================== SECTION EVENEMENTS ===================== */}
      <section ref={eventsRef} id="evenements" className="events-section-enhanced py-5 fade-in-section">
        <Container className="px-3 px-md-0">
          {/* En-tête */}
          <div className="section-header text-center mb-5">
            <div className="section-badge slide-down">
              <span>Événements & Certifications</span>
            </div>
            <h2 className="section-title fw-bold mb-3 slide-down" style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', animationDelay: '0.1s' }}>
              Événements & Certifications
            </h2>
            <p className="section-subtitle text-muted slide-down" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.1rem)', animationDelay: '0.2s' }}>
              Découvrez nos événements à venir et nos certifications de qualité
            </p>
            <div className="title-underline"></div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
              <p className="mt-3 text-muted">Chargement...</p>
            </div>
          ) : (
            <Tabs defaultActiveKey="events" className="nav-modern mb-4 justify-content-center">
              {/* ONGLET ÉVÉNEMENTS */}
              <Tab 
                eventKey="events" 
                title={<span className="fw-bold" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}> Événements ({events.length})</span>}
              >
                <div className="py-4">
                  {events.length === 0 ? (
                    <Card className="text-center py-5 border-0 shadow-sm slide-up empty-state-card">
                      <Card.Body>
                        <div className="display-1 mb-3">📭</div>
                        <h3 className="text-muted">Aucun événement pour le moment</h3>
                        <p className="text-muted">Revenez bientôt pour découvrir nos prochains événements !</p>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Row className="g-3 g-md-4">
                      {events.map((event, idx) => (
                        <Col key={event.id} xs={12} md={6} lg={4} className="slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                          <div className="event-card-modern h-100">
                            <div className="event-image-wrapper">
                              <div
                                className="event-image"
                                style={{
                                  background: event.image
                                    ? `url(${resolveMediaUrl(event.image)}) center/cover`
                                    : 'linear-gradient(135deg, #10b981 0%, #16a34a 100%)',
                                  minHeight: '200px'
                                }}
                              >
                                {!event.image && (
                                  <div className="d-flex align-items-center justify-content-center h-100">
                                    <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>📅</span>
                                  </div>
                                )}
                              </div>
                              <div className="event-badge">
                                {isUpcoming(event.date_evenement) ? (
                                  <Badge bg="success" className="badge-modern">
                                    <span className="fw-bold">✨ À venir</span>
                                  </Badge>
                                ) : (
                                  <Badge bg="secondary" className="badge-modern">
                                    <span className="fw-bold">📌 Terminé</span>
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="event-content">
                              <div className="event-date-badge" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                                📆 {formatDate(event.date_evenement)}
                              </div>
                              <h4 className="fw-bold mb-3 event-title" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
                                {event.titre}
                              </h4>
                              <p className="text-muted event-description" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>
                                {event.description}
                              </p>
                              <div className="event-footer">
                                <small className="text-muted" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.85rem)' }}>
                                  <span>📍 {event.lieu || 'Lieu à confirmer'}</span>
                                </small>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              </Tab>

              {/* ONGLET CERTIFICATIONS */}
              <Tab 
                eventKey="certifications" 
                title={<span className="fw-bold" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}> Certifications ({certifications.length})</span>}
              >
                <div className="py-4">
                  {certifications.length === 0 ? (
                    <Card className="text-center py-5 border-0 shadow-sm slide-up empty-state-card">
                      <Card.Body>
                        <div className="display-1 mb-3">📜</div>
                        <h3 className="text-muted">Aucune certification pour le moment</h3>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Row className="g-3 g-md-4">
                      {certifications.map((cert, idx) => {
                        // Parser les images
                        let imagesList = [];
                        if (cert.images) {
                          if (typeof cert.images === 'string') {
                            try {
                              imagesList = cert.images.startsWith('[') ? JSON.parse(cert.images) : [cert.images];
                            } catch (e) {
                              imagesList = [cert.images];
                            }
                          } else if (Array.isArray(cert.images)) {
                            imagesList = cert.images;
                          }
                        }
                        const firstImage = imagesList.length > 0 ? imagesList[0] : null;
                        const imageUrl = firstImage ? resolveMediaUrl(firstImage) : null;
                        
                        return (
                          <Col key={cert.id} xs={12} md={6} lg={4} className="slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="cert-card-pro h-100" style={{
                              border: '1px solid #e5e5e5',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                              transition: 'all 0.3s ease'
                            }}>
                              {/* Titre centré en haut */}
                              <div style={{
                                padding: '16px 12px',
                                backgroundColor: '#f8f9fa',
                                borderBottom: '2px solid #10b981',
                                textAlign: 'center'
                              }}>
                                <h6 style={{
                                  margin: 0,
                                  fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                                  fontWeight: '600',
                                  color: '#1f2937',
                                  letterSpacing: '0.5px',
                                  textTransform: 'uppercase',
                                  lineHeight: '1.4'
                                }}>
                                  {cert.titre}
                                </h6>
                              </div>

                              {/* Image au centre */}
                              <div className="cert-image-pro" style={{
                                flex: 1,
                                minHeight: 'clamp(150px, 40vw, 220px)',
                                position: 'relative',
                                overflow: 'hidden'
                              }}>
                                <div
                                  className="cert-image-bg"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    background: imageUrl
                                      ? `url(${imageUrl}) center/contain`
                                      : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                  }}
                                >
                                  {!imageUrl && (
                                    <div className="d-flex align-items-center justify-content-center h-100">
                                      <span style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>🏆</span>
                                    </div>
                                  )}
                                </div>
                                <Button 
                                  className="btn-apercu-pro"
                                  onClick={() => handleViewImage(cert)}
                                  style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    right: '12px',
                                    backgroundColor: 'rgba(107, 114, 128, 0.7)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '8px 16px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  APERÇU
                                </Button>
                              </div>

                              {/* Organisme et Date en bas */}
                              <div style={{
                                padding: '12px 16px',
                                backgroundColor: '#ffffff',
                                borderTop: '1px solid #e5e5e5'
                              }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                                  {cert.organisme && (
                                    <p style={{
                                      flex: 1,
                                      fontSize: '13px',
                                      fontWeight: '500',
                                      color: '#4b5563',
                                      margin: 0
                                    }}>
                                      {cert.organisme}
                                    </p>
                                  )}
                                  {cert.date_obtention && (
                                    <p style={{
                                      fontSize: '12px',
                                      color: '#9ca3af',
                                      margin: 0,
                                      whiteSpace: 'nowrap'
                                    }}>
                                      {new Date(cert.date_obtention).toLocaleDateString('fr-FR', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </div>
              </Tab>
            </Tabs>
          )}
        </Container>
      </section>

      {/* Modal pour afficher le certificat */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid #10b981' }}>
          <Modal.Title style={{ 
            width: '100%', 
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: '600',
            color: '#1f2937',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            lineHeight: '1.4'
          }}>{selectedCert?.titre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCert?.images && (() => {
            let imagesList = [];
            if (typeof selectedCert.images === 'string') {
              try {
                imagesList = selectedCert.images.startsWith('[') ? JSON.parse(selectedCert.images) : [selectedCert.images];
              } catch (e) {
                imagesList = [selectedCert.images];
              }
            } else if (Array.isArray(selectedCert.images)) {
              imagesList = selectedCert.images;
            }
            
            if (imagesList.length === 0) return null;
            
            const currentImg = imagesList[currentImageIndex];
            const imgUrl = resolveMediaUrl(currentImg);
            
            return (
              <div>
                {/* Carrousel */}
                <div style={{ 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  {/* Flèche gauche */}
                  <button
                    onClick={handlePrevImage}
                    disabled={currentImageIndex === 0}
                    style={{
                      background: currentImageIndex === 0 ? '#ccc' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ◀
                  </button>

                  {/* Image */}
                  <img 
                    src={imgUrl} 
                    alt={`${selectedCert.titre}-${currentImageIndex}`}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '400px',
                      borderRadius: '8px',
                      objectFit: 'contain'
                    }}
                  />

                  {/* Flèche droite */}
                  <button
                    onClick={() => handleNextImage(imagesList.length)}
                    disabled={currentImageIndex === imagesList.length - 1}
                    style={{
                      background: currentImageIndex === imagesList.length - 1 ? '#ccc' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: currentImageIndex === imagesList.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ▶
                  </button>
                </div>

                {/* Indicateur */}
                <div style={{ 
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '20px'
                }}>
                  Image {currentImageIndex + 1} sur {imagesList.length}
                </div>
              </div>
            );
          })()}

          {/* Informations détaillées - Design professionnel */}
          <div style={{ marginTop: '25px', borderTop: '1px solid #e5e5e5', paddingTop: '20px' }}>
            {/* Organisme et Date sur la même ligne */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', marginBottom: '12px' }}>
              {selectedCert?.organisme && (
                <p style={{ color: '#666', fontSize: '15px', marginBottom: 0 }}>
                  <strong>{selectedCert.organisme}</strong>
                </p>
              )}

              {selectedCert?.date_obtention && (
                <p style={{ color: '#999', fontSize: '14px', marginBottom: 0, textAlign: 'right' }}>
                  {new Date(selectedCert.date_obtention).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext.jsx';

const Home = () => {
  const { settings } = useSettings();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-4 py-md-5">
        <Container className="py-3 py-md-5 text-white text-center px-3">
          <h1 className="fw-bold mb-4" style={{fontSize: 'clamp(2rem, 8vw, 3rem)', lineHeight: '1.2'}}>
             {settings.hero_title || 'Bienvenue chez Rigoula'}
          </h1>
          <p className="fs-4 mb-5" style={{fontSize: 'clamp(1rem, 4vw, 1.5rem)', lineHeight: '1.5'}}>
            {settings.hero_subtitle || 'Des produits agricoles biologiques frais et de qualité supérieure'}
          </p>
          <Link to="/produits">
            <Button size="lg" className="hero-btn fw-bold px-4 py-2 py-md-3" style={{fontSize: 'clamp(0.95rem, 2vw, 1.1rem)'}}>
              Découvrir nos produits
            </Button>
          </Link>
        </Container>
      </section>

      {/* Présentation rapide */}
      <section className="features-section py-5">
        <Container className="px-3 px-md-0">
          <Row className="g-4">
            <Col xs={12} md={4} className="text-center">
              <div className="feature-icon" style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>🍊</div>
              <h3 className="h4 mb-3 fw-bold" style={{color: '#1b7d38', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'}}>Produits Frais</h3>
              <p className="text-muted" style={{fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)'}}>
                Des fruits et légumes récoltés chaque jour avec le meilleur soin
              </p>
            </Col>
            <Col xs={12} md={4} className="text-center">
              <div className="feature-icon" style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>🌿</div>
              <h3 className="h4 mb-3 fw-bold" style={{color: '#1b7d38', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'}}>100% Biologique</h3>
              <p className="text-muted" style={{fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)'}}>
                Sans pesticides ni additifs chimiques, cultivés naturellement
              </p>
            </Col>
            <Col xs={12} md={4} className="text-center">
              <div className="feature-icon" style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>🚚</div>
              <h3 className="h4 mb-3 fw-bold" style={{color: '#1b7d38', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'}}>Livraison Rapide</h3>
              <p className="text-muted" style={{fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)'}}>
                Livraison à domicile dans toute la Tunisie en moins de 24h
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
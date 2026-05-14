import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import api from '../services/api';
import TopProduitsStats from '../components/TopProduitsStats';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    // Rafraîchir les stats toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/statistiques/dashboard');
      setStats(response.data.data);
    } catch {
      console.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <div className="py-4 py-md-5 bg-light">
      <Container className="px-3 px-md-0">
        <div className="mb-4">
          <h1 className="fw-bold" style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Tableau de bord</h1>
        </div>

        {/* Statistiques principales */}
        <Row className="mb-4 g-2 g-md-3">
          <Col xs={12} sm={6} lg={3} className="mb-2">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-2" style={{ color: '#10b981' }}>👥</div>
                <h3 className="fw-bold">{stats?.totalUsers || 0}</h3>
                <p className="text-muted mb-0">Clients</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-2" style={{ color: '#10b981' }}>📦</div>
                <h3 className="fw-bold">{stats?.totalProduits || 0}</h3>
                <p className="text-muted mb-0">Produits</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-2" style={{ color: '#10b981' }}>🛒</div>
                <h3 className="fw-bold">{stats?.totalCommandes || 0}</h3>
                <p className="text-muted mb-0">Commandes</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-2" style={{ color: '#fbbf24' }}>💰</div>
                <h3 className="fw-bold">{parseFloat(stats?.revenue || 0).toFixed(3)} TND</h3>
                <p className="text-muted mb-0">Chiffre d'affaires</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistiques secondaires */}
        <Row className="mb-4 g-2 g-md-3">
          <Col xs={12} sm={6} lg={4} className="mb-2">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h6 className="text-muted mb-2" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Commandes en attente</h6>
                <h3 className="fw-bold text-warning" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.5rem)' }}>{stats?.pendingOrders || 0}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={4} className="mb-2">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h6 className="text-muted mb-2" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Messages non lus</h6>
                <h3 className="fw-bold text-info" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.5rem)' }}>{stats?.unreadMessages || 0}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={4} className="mb-2">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h6 className="text-muted mb-2" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Produits en rupture</h6>
                <h3 className="fw-bold text-danger" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.5rem)' }}>{stats?.outOfStock || 0}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Top Produits Stats */}
        <TopProduitsStats />
      </Container>
    </div>
  );
};

export default Dashboard;
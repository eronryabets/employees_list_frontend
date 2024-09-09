import styles from './CardBootstrap.module.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface CardBootstrapProps {
    width: string;
    variant: string;
    img_src: string;
    card_title: string;
    card_text: string;
    card_row_text: string[];
    card_links: { url: string; label: string }[];
}

export const CardBootstrap = ({
                                  width,
                                  variant,
                                  img_src,
                                  card_title,
                                  card_text,
                                  card_row_text,
                                  card_links
                              }: CardBootstrapProps) => {
    return (
            <Card style={{width: width}} className={styles.cardBootstrap}>
                <Card.Img variant="top"
                          src={img_src}
                          className={styles.fixedImg}/>
                <Card.Body>
                    <Card.Title>{card_title}</Card.Title>
                    <Card.Text>{card_text}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" style={{ color: 'red' }}>
                    {card_row_text.map((row, index) => (
                        <ListGroup.Item key={index} className={styles.item}>{row}</ListGroup.Item>
                    ))}
                </ListGroup>
                <Card.Body>
                    {card_links.map((link, index) => (
                        <Card.Link key={index} href={link.url}>
                            {link.label}
                        </Card.Link>
                    ))}
                </Card.Body>
            </Card>
    );
};
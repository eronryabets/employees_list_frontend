import React, { useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from './CardBootstrap.module.scss';

interface CardBootstrapProps {
    width: string;
    variant: string;
    img_src: string;
    card_title: string;
    card_text: string;
    card_row_text: string[];
    card_links: { url: string; label: string }[];
    initialRating: number;
    onSave: (newRating: number) => void;
}

export const CardBootstrap = ({
    width,
    variant,
    img_src,
    card_title,
    card_text,
    card_row_text,
    card_links,
    initialRating,
    onSave,
}: CardBootstrapProps) => {
    // Локальное состояние для рейтинга
    const [rating, setRating] = useState(initialRating);

    const handleIncrease = () => {
        setRating(rating + 1);
    };

    const handleDecrease = () => {
        setRating(rating > 0 ? rating - 1 : 0);
    };

    const handleSave = () => {
        onSave(rating); // Сохранение нового рейтинга
    };

    return (
        <Card style={{ width: width }} className={styles.cardBootstrap}>
            <div className={styles.cardContent}>
                <Card.Img variant={variant} src={img_src} className={styles.fixedImg} />

                <Card.Body>
                    <Card.Title>{card_title}</Card.Title>
                    <Card.Text>{card_text}</Card.Text>
                </Card.Body>
                <Button variant="outline-danger"
                        className={styles.deleteButton}
                        // onClick={handleDelete}
                >Delete</Button>{' '}
            </div>

            <ListGroup className="list-group-flush">
                {card_row_text.map((row, index) => (
                    <div key={index} className={styles.cardContent}>
                        {/* Проверка строки "Rating:" заменена на вывод рейтинга напрямую */}
                        {row.startsWith('Rating:') ? (
                            <ListGroup.Item className={styles.item}>
                                Rating: {rating}
                                <div className={styles.buttons}>
                                    <Button variant="success"
                                            className={styles.button}
                                            onClick={handleIncrease}>+</Button>{' '}
                                    <Button variant="dark"
                                            className={styles.button}
                                            onClick={handleDecrease}>-</Button>
                                    <Button variant="primary"
                                            className={styles.button}
                                            onClick={handleSave}>Save</Button>
                                </div>
                            </ListGroup.Item>
                        ) : (
                            <ListGroup.Item className={styles.item}>{row}</ListGroup.Item>
                        )}
                    </div>
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

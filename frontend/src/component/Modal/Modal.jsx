import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap'
import styles from './AdvanceModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const ViewModal = ({ task, showModal, setShowModal }) => {
	const user = JSON.parse(localStorage.getItem('user'))

	useCallback(() => {}, [task])

	return (
		<>
			<Modal
				show={showModal}
				onHide={() => setShowModal(prev => !prev)}
				centered
				size="lg">
				<Modal.Header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						backgroundColor: '#7993d2'
					}}>
					<Modal.Title style={{ fontSize: '2em' }}>View Task</Modal.Title>

					<div className="ms-auto">
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faClose}
							onClick={() => setShowModal(current => !current)}
						/>
					</div>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col md={6}>
							<label style={{ fontWeight: 'bold', fontSize: '24px' }}>
								User
							</label>
							<p>{user?.name}</p>
						</Col>

						<Col md={6}>
							<label style={{ fontWeight: 'bold', fontSize: '24px' }}>
								Status
							</label>
							<p>{task?.completed ? 'Completed' : 'Not yet'}</p>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<label style={{ fontWeight: 'bold', fontSize: '24px' }}>
								Title
							</label>
							<p>{task?.title}</p>
						</Col>

						<Col md={6}>
							<label style={{ fontWeight: 'bold', fontSize: '24px' }}>
								Due Date
							</label>
							<p>{task?.dueDate}</p>
						</Col>
					</Row>
					<div className="row">
						<div className="col-12 col-md-12">
							<label style={{ fontWeight: 600, fontSize: '1.2em' }}>
								Description
							</label>
							<textarea
								rows={5}
								disabled
								style={{
									marginInline: 'auto',
									width: '98%',
									border: '2px solid blue',
									borderRadius: '5px'
								}}>
								{task?.description}
							</textarea>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default ViewModal

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, Image
)
from reportlab.pdfgen import canvas
import os

# Colors matching the CRM
PRIMARY = HexColor('#1a3c34')
SECONDARY = HexColor('#2e7d5b')
ACCENT = HexColor('#3a9d6e')
GOLD = HexColor('#8b7355')
LIGHT_BG = HexColor('#f4f5f7')
BORDER = HexColor('#d4dbd7')
TEXT = HexColor('#1e2a26')
TEXT_LIGHT = HexColor('#5f7068')
DANGER = HexColor('#b83230')
WHITE = white

W, H = A4

# ── Styles ──
styles = getSampleStyleSheet()

sTitle = ParagraphStyle('DocTitle', parent=styles['Title'], fontSize=28, leading=34,
    textColor=PRIMARY, fontName='Helvetica-Bold', alignment=TA_CENTER, spaceAfter=6)
sSubtitle = ParagraphStyle('DocSub', parent=styles['Normal'], fontSize=12, leading=16,
    textColor=TEXT_LIGHT, fontName='Helvetica', alignment=TA_CENTER, spaceAfter=20)
sH1 = ParagraphStyle('H1', parent=styles['Heading1'], fontSize=18, leading=22,
    textColor=PRIMARY, fontName='Helvetica-Bold', spaceBefore=20, spaceAfter=10)
sH2 = ParagraphStyle('H2', parent=styles['Heading2'], fontSize=14, leading=18,
    textColor=SECONDARY, fontName='Helvetica-Bold', spaceBefore=16, spaceAfter=8)
sH3 = ParagraphStyle('H3', parent=styles['Heading3'], fontSize=12, leading=15,
    textColor=GOLD, fontName='Helvetica-Bold', spaceBefore=12, spaceAfter=6)
sBody = ParagraphStyle('Body', parent=styles['Normal'], fontSize=10, leading=14,
    textColor=TEXT, fontName='Helvetica', spaceAfter=6)
sBodyBold = ParagraphStyle('BodyBold', parent=sBody, fontName='Helvetica-Bold')
sSmall = ParagraphStyle('Small', parent=styles['Normal'], fontSize=8.5, leading=11,
    textColor=TEXT_LIGHT, fontName='Helvetica')
sNote = ParagraphStyle('Note', parent=sBody, fontSize=9, leading=12,
    textColor=GOLD, fontName='Helvetica-Oblique', leftIndent=12, borderColor=GOLD,
    borderWidth=0, borderPadding=4)
sConfidential = ParagraphStyle('Conf', parent=sBody, fontSize=9, leading=12,
    textColor=DANGER, fontName='Helvetica-Bold')
sCred = ParagraphStyle('Cred', parent=sBody, fontSize=9.5, leading=13,
    fontName='Courier', textColor=TEXT)
sCenter = ParagraphStyle('Center', parent=sBody, alignment=TA_CENTER)
sFooter = ParagraphStyle('Footer', parent=styles['Normal'], fontSize=7.5, leading=9,
    textColor=TEXT_LIGHT, fontName='Helvetica', alignment=TA_CENTER)

# ── Page template ──
def header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    # Header line
    canvas_obj.setStrokeColor(SECONDARY)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(30, H - 35, W - 30, H - 35)
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.setFillColor(TEXT_LIGHT)
    canvas_obj.drawString(30, H - 30, "CLINIQUE THE GRACE OF GOD — DOCUMENT CONFIDENTIEL")
    canvas_obj.drawRightString(W - 30, H - 30, "Système CRM v1.0")
    # Footer
    canvas_obj.line(30, 40, W - 30, 40)
    canvas_obj.drawString(30, 28, "Avenue Kola N°204, Ngiri-Ngiri, Kinshasa, RDC")
    canvas_obj.drawRightString(W - 30, 28, f"Page {doc.page}")
    canvas_obj.restoreState()

def build_pdf():
    output_path = "/sessions/practical-vigilant-euler/mnt/project 2/CRM_Guide_Clinique_Grace_of_God.pdf"
    doc = SimpleDocTemplate(output_path, pagesize=A4,
        topMargin=45, bottomMargin=55, leftMargin=40, rightMargin=40)
    
    story = []

    # ═══════════ COVER PAGE ═══════════
    story.append(Spacer(1, 60))
    
    # Logo
    logo_path = "/sessions/practical-vigilant-euler/mnt/project 2/logo.png"
    if os.path.exists(logo_path):
        logo = Image(logo_path, width=160, height=120)
        logo.hAlign = 'CENTER'
        story.append(logo)
        story.append(Spacer(1, 20))

    story.append(Paragraph("Système de Gestion<br/>Hospitalière (CRM)", sTitle))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Guide d'utilisation et identifiants du personnel", sSubtitle))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="60%", thickness=1, color=SECONDARY, spaceAfter=16, spaceBefore=0, hAlign='CENTER'))
    
    # Cover info table
    cover_data = [
        ['Établissement', 'Clinique The Grace of God'],
        ['Adresse', 'Avenue Kola N°204, Ngiri-Ngiri, Kinshasa, RDC'],
        ['Directeur', 'Dr. Thierry Mukandila Kasongo'],
        ['Téléphone', '+243 815 000 000'],
        ['Version CRM', 'v1.0 — Mai 2025'],
        ['Classification', 'CONFIDENTIEL'],
    ]
    cover_table = Table(cover_data, colWidths=[130, 300])
    cover_table.setStyle(TableStyle([
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTNAME', (1,0), (1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 10),
        ('TEXTCOLOR', (0,0), (0,-1), TEXT_LIGHT),
        ('TEXTCOLOR', (1,0), (1,-1), TEXT),
        ('TEXTCOLOR', (1,-1), (1,-1), DANGER),
        ('FONTNAME', (1,-1), (1,-1), 'Helvetica-Bold'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, BORDER),
        ('LINEBELOW', (0,-1), (-1,-1), 1, DANGER),
    ]))
    story.append(cover_table)
    
    story.append(Spacer(1, 30))
    story.append(Paragraph("Ce document contient des identifiants de connexion sensibles.<br/>Ne pas distribuer en dehors du personnel autorisé.", sConfidential))

    story.append(PageBreak())

    # ═══════════ TABLE OF CONTENTS ═══════════
    story.append(Paragraph("Table des matières", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=12))
    
    toc_items = [
        ('1.', 'Présentation générale du système'),
        ('2.', 'Flux patient — Parcours complet'),
        ('3.', 'Identifiants de connexion du personnel'),
        ('4.', 'Portail Réception (Front Desk)'),
        ('5.', 'Portail Pharmacie (Caisse centrale)'),
        ('6.', 'Portail Infirmier'),
        ('7.', 'Portail Médecin'),
        ('8.', 'Portail Laboratoire'),
        ('9.', 'Portail Administration'),
        ('10.', 'Assistant IA intégré'),
        ('11.', 'Catégories d\'assurance'),
        ('12.', 'Notes importantes'),
    ]
    for num, title in toc_items:
        story.append(Paragraph(f"<b>{num}</b>  {title}", sBody))
    
    story.append(PageBreak())

    # ═══════════ 1. OVERVIEW ═══════════
    story.append(Paragraph("1. Présentation générale", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph(
        "Le CRM de la Clinique The Grace of God est un système de gestion hospitalière "
        "intégré, conçu sur mesure pour gérer l'ensemble du parcours patient, de l'accueil "
        "à la sortie. Le système fonctionne entièrement dans un navigateur web — aucune "
        "installation n'est nécessaire.", sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Caractéristiques principales :", sBodyBold))
    features = [
        "Connexion sécurisée par identifiant/mot de passe (aucune inscription possible)",
        "Portails spécialisés selon le rôle de chaque agent",
        "Tous les paiements transitent obligatoirement par la Pharmacie",
        "Inventaire pharmaceutique avec alertes de stock critique",
        "Notes confidentielles médecin (visibles uniquement par le médecin et l'admin)",
        "Rapports financiers avec filtres par catégorie d'assurance",
        "Catégorisation des patients (Régulier, CSU, Academia, AMC, Activa)",
        "Assistant IA intégré pour le personnel",
        "Données de démonstration pré-chargées pour la présentation",
    ]
    for f in features:
        story.append(Paragraph(f"•  {f}", ParagraphStyle('Bullet', parent=sBody, leftIndent=16, bulletIndent=0)))
    
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Accès :</b> Ouvrir le fichier <font name='Courier'>hospital-crm.html</font> dans un navigateur web (Chrome, Firefox, Edge).", sBody))

    # ═══════════ 2. PATIENT FLOW ═══════════
    story.append(Paragraph("2. Flux patient — Parcours complet", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph(
        "Chaque patient suit un parcours strict. La Pharmacie est le point central "
        "de contrôle financier — aucun service n'est rendu sans que le paiement "
        "correspondant ait été enregistré par la pharmacie.", sBody))
    story.append(Spacer(1, 8))

    flow_data = [
        ['Étape', 'Service', 'Action'],
        ['1', 'Réception', 'Enregistrement du patient (nom, téléphone, motif)'],
        ['2', 'Pharmacie', 'Paiement de la consultation médicale'],
        ['3', 'Infirmier', 'Prise des vitaux (T°, TA, poids, SpO2, triage)'],
        ['4', 'Médecin', 'Consultation, diagnostic, prescriptions, ordres de labo'],
        ['5', 'Pharmacie', 'Paiement des examens de laboratoire / médicaments'],
        ['6', 'Laboratoire', 'Réalisation des analyses, résultats renvoyés au médecin'],
        ['7', 'Médecin', 'Lecture des résultats, décision de suite'],
        ['8', 'Pharmacie', 'Paiement de sortie / dispensation des médicaments'],
        ['9', 'Sortie', 'Patient terminé'],
    ]
    flow_table = Table(flow_data, colWidths=[40, 90, 330])
    flow_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9.5),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        # Highlight pharmacy rows
        ('BACKGROUND', (1,2), (1,2), HexColor('#e8f0eb')),
        ('BACKGROUND', (1,5), (1,5), HexColor('#e8f0eb')),
        ('BACKGROUND', (1,8), (1,8), HexColor('#e8f0eb')),
        ('FONTNAME', (1,2), (1,2), 'Helvetica-Bold'),
        ('FONTNAME', (1,5), (1,5), 'Helvetica-Bold'),
        ('FONTNAME', (1,8), (1,8), 'Helvetica-Bold'),
    ]))
    story.append(flow_table)
    story.append(Spacer(1, 8))
    story.append(Paragraph("Les lignes surlignées en vert indiquent les passages obligatoires par la Pharmacie.", sNote))

    story.append(PageBreak())

    # ═══════════ 3. CREDENTIALS ═══════════
    story.append(Paragraph("3. Identifiants de connexion", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph("DOCUMENT CONFIDENTIEL — Ne pas photocopier ni partager", sConfidential))
    story.append(Spacer(1, 8))

    # Test admin
    story.append(Paragraph("Compte administrateur de test", sH3))
    test_data = [
        ['Identifiant', 'Mot de passe', 'Accès'],
        ['levi', 'admin', 'SUPER ADMIN — Accès à tous les portails'],
    ]
    test_table = Table(test_data, colWidths=[120, 120, 230])
    test_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), HexColor('#4a3080')),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9.5),
        ('FONTNAME', (0,1), (1,-1), 'Courier-Bold'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('BACKGROUND', (0,1), (-1,-1), HexColor('#eeeaf5')),
    ]))
    story.append(test_table)
    story.append(Spacer(1, 6))
    story.append(Paragraph("Le compte Super Admin dispose d'une barre violette en haut de l'écran permettant de basculer entre tous les portails.", sNote))
    story.append(Spacer(1, 12))

    # Doctors
    story.append(Paragraph("Médecins", sH2))
    doc_data = [
        ['Nom', 'Identifiant', 'Mot de passe', 'Portail'],
        ['Dr. Thierry Mukandila Kasongo', 'mukandila', 'Kason01@A', 'Médecin / Directeur'],
        ['Dr. Billy NSENDA ILUNGA', 'ilunga', 'Ilung02#B', 'Médecin'],
        ['Dr Ifaso Lokela', 'ifaso', 'Ifaso04#D', 'Médecin'],
        ['Dr ABEDI SALUMU Teddy', 'abedi', 'Teddy06#F', 'Médecin'],
    ]
    doc_table = Table(doc_data, colWidths=[170, 75, 85, 140])
    doc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('FONTNAME', (1,1), (2,-1), 'Courier'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(doc_table)
    story.append(Spacer(1, 10))

    # Administration
    story.append(Paragraph("Administration", sH2))
    admin_data = [
        ['Nom', 'Identifiant', 'Mot de passe', 'Portail'],
        ['Dr Muadi Ntumba Cyntyche', 'muadi', 'Cynty07@G', 'Admin (AG)'],
        ['Christianne MATONDO', 'matondo', 'Maton08#H', 'Admin (IT)'],
    ]
    admin_table = Table(admin_data, colWidths=[170, 75, 85, 140])
    admin_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('FONTNAME', (1,1), (2,-1), 'Courier'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(admin_table)
    story.append(Spacer(1, 10))

    # Nurses
    story.append(Paragraph("Infirmiers (EXP)", sH2))
    nurse_data = [
        ['Nom', 'Identifiant', 'Mot de passe', 'Portail'],
        ['Jeannette MBUNGU TUMBA', 'mbungu', 'Tumba09@I', 'Infirmier'],
        ['MUJINGA N. Therese', 'therese', 'There10#J', 'Infirmier'],
    ]
    nurse_table = Table(nurse_data, colWidths=[170, 75, 85, 140])
    nurse_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('FONTNAME', (1,1), (2,-1), 'Courier'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(nurse_table)
    story.append(Spacer(1, 10))

    # Lab
    story.append(Paragraph("Laboratoire", sH2))
    lab_data = [
        ['Nom', 'Identifiant', 'Mot de passe', 'Portail'],
        ['Espoir KIMFUMU MASANGA', 'masanga', 'Masan11@K', 'Laboratoire'],
        ['Jeancy Kanana', 'kanana', 'Kanan12#L', 'Laboratoire'],
        ['Fabrice NDOMBE MAFUENI', 'mafueni', 'Mafen13@M', 'Laboratoire'],
    ]
    lab_table = Table(lab_data, colWidths=[170, 75, 85, 140])
    lab_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('FONTNAME', (1,1), (2,-1), 'Courier'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(lab_table)
    story.append(Spacer(1, 10))

    # Pharmacy
    story.append(Paragraph("Pharmacie", sH2))
    pharm_data = [
        ['Nom', 'Identifiant', 'Mot de passe', 'Portail'],
        ['Eunice Kabedi Kabala', 'kabala', 'Kabal14#N', 'Pharmacie (Chef)'],
        ['Nyunga Gypsy', 'ntumba', 'Ntumb15@O', 'Pharmacie'],
    ]
    pharm_table = Table(pharm_data, colWidths=[170, 75, 85, 140])
    pharm_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('FONTNAME', (1,1), (2,-1), 'Courier'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(pharm_table)
    story.append(Spacer(1, 10))

    # Reception
    story.append(Paragraph("Réception", sH2))
    recep_data = [
        ['Nom', 'Identifiant', 'Mot de passe', 'Portail'],
        ['Joelle MULUMBA B.', 'mulumba', 'Mulum16#P', 'Réception'],
        ['Micheline Wumba', 'wumba', 'Wumba17@Q', 'Réception'],
        ['Dorcas MWADI', 'mwadi', 'Mwadi18#R', 'Réception'],
        ['MUKWANGA ANNE', 'mukwanga', 'Annex19@S', 'Réception (Annexe)'],
        ['Assia Lukuamu', 'lukuamu', 'Lukua20#T', 'Réception'],
    ]
    recep_table = Table(recep_data, colWidths=[170, 75, 85, 140])
    recep_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('FONTNAME', (1,1), (2,-1), 'Courier'),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(recep_table)
    story.append(Spacer(1, 10))

    # No-login staff
    story.append(Paragraph("Personnel sans accès système", sH2))
    story.append(Paragraph("Ces agents figurent dans l'annuaire mais n'ont pas encore d'identifiants de connexion :", sBody))
    nologin_data = [
        ['Nom', 'Département', 'Titre'],
        ['Lusakweno Giscard', 'Réception', 'Réceptionniste'],
        ['Dr Ndongala Bienheureuse', 'Médecine', 'Médecin'],
        ['Jack Matanda Salang', 'Sécurité', 'Agent de Sécurité'],
        ['Dadou BUEBUA KATUMBA', 'Sécurité', 'Agent de Sécurité'],
        ['Irène Mbuyi', 'Pharmacie', 'Pharmacienne'],
    ]
    nologin_table = Table(nologin_data, colWidths=[180, 130, 160])
    nologin_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), GOLD),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(nologin_table)

    story.append(PageBreak())

    # ═══════════ 4-8. PORTAL WALKTHROUGHS ═══════════
    
    # 4. Reception
    story.append(Paragraph("4. Portail Réception", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph("Le portail Réception est le point d'entrée de chaque patient dans le système.", sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Fonctionnalités :", sBodyBold))
    for item in [
        "Nouveau Patient — Formulaire d'enregistrement complet (nom, prénom, téléphone, sexe, date de naissance, langue préférée, adresse, motif de visite)",
        "Patients du Jour — Liste de tous les patients enregistrés avec leur étape actuelle, catégorie d'assurance, et heure d'arrivée",
        "Rechercher — Recherche par nom, prénom, téléphone ou ID patient",
    ]:
        story.append(Paragraph(f"•  {item}", ParagraphStyle('B', parent=sBody, leftIndent=16)))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Après l'enregistrement, le patient est automatiquement dirigé vers la Pharmacie pour le paiement de la consultation. Le badge NOUVEAU apparaît sur le patient dans tous les portails.", sNote))

    story.append(Spacer(1, 16))

    # 5. Pharmacy
    story.append(Paragraph("5. Portail Pharmacie", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph("La Pharmacie est le centre névralgique financier. Tous les paiements de la clinique transitent par ce portail.", sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Onglets disponibles :", sBodyBold))
    pharm_tabs = [
        ("Caisse", "File d'attente des patients en attente de paiement. Chaque patient affiche le type de paiement requis (consultation, examens, sortie), un montant suggéré, et un bouton de validation. Le paiement fait avancer le patient à l'étape suivante."),
        ("Ordonnances", "Liste des prescriptions en attente de dispensation. Le pharmacien peut marquer chaque ordonnance comme dispensée."),
        ("Stock", "Inventaire complet des 24 médicaments référencés avec : stock actuel, stock minimum, statut (OK / CRITIQUE), prix unitaire en CDF, fournisseur. Alertes rouges pour les produits en dessous du seuil critique. Filtres par catégorie et statut."),
        ("Modifier Patient", "Permet de modifier les informations personnelles d'un patient ainsi que sa catégorie d'assurance."),
        ("Rapports Financiers", "Revenus par catégorie d'assurance (Régulier, CSU, Academia, AMC, Activa) avec pourcentages et barres visuelles. Revenus par type de service. Détail de chaque transaction avec filtre."),
    ]
    for tab_name, tab_desc in pharm_tabs:
        story.append(Paragraph(f"<b>{tab_name} :</b> {tab_desc}", ParagraphStyle('B', parent=sBody, leftIndent=16, spaceAfter=4)))
    
    story.append(Spacer(1, 16))

    # 6. Nurse
    story.append(Paragraph("6. Portail Infirmier", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph("L'infirmier reçoit les patients après le paiement de consultation à la pharmacie.", sBody))
    story.append(Spacer(1, 6))
    for item in [
        "File d'attente — Patients ayant payé la consultation, prêts pour la prise de vitaux",
        "Formulaire de vitaux : Température, Tension artérielle, Poids, Taille, Pouls, SpO2",
        "Classification triage : Rouge (urgence vitale), Orange, Jaune, Vert, Bleu (non urgent)",
        "Vue Globale — Tableau récapitulatif de tous les patients avec leurs vitaux et triage",
    ]:
        story.append(Paragraph(f"•  {item}", ParagraphStyle('B', parent=sBody, leftIndent=16)))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Après validation des vitaux, le patient est automatiquement transféré au Médecin.", sNote))

    story.append(PageBreak())

    # 7. Doctor
    story.append(Paragraph("7. Portail Médecin", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph("Le portail le plus complet. Le médecin consulte, diagnostique, et décide de la suite du parcours.", sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Consultations", sH3))
    story.append(Paragraph("Pour chaque patient, le médecin dispose de :", sBody))
    for item in [
        "Affichage complet des vitaux avec classification triage",
        "Champ Diagnostic pour saisir le diagnostic principal",
        "Assignation de catégorie d'assurance (Régulier, CSU, Academia, AMC, Activa)",
        "Ordres de laboratoire — Saisie des examens à réaliser",
        "Prescriptions — Saisie des médicaments et posologie",
        "Notes confidentielles — Visibles UNIQUEMENT par le médecin auteur et l'administrateur",
    ]:
        story.append(Paragraph(f"•  {item}", ParagraphStyle('B', parent=sBody, leftIndent=16)))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Actions de sortie :", sH3))
    story.append(Paragraph("<b>Pharmacie &gt; Labo/Méds</b> — Envoie le patient payer les examens/médicaments avant le laboratoire.", sBody))
    story.append(Paragraph("<b>Pharmacie &gt; Sortie</b> — Envoie le patient payer les frais de sortie directement.", sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Notes Confidentielles", sH3))
    story.append(Paragraph("Les notes marquées comme confidentielles sont stockées séparément et ne sont accessibles que par le médecin qui les a écrites et par les comptes Administrateur. Elles n'apparaissent dans aucun autre portail.", sBody))

    story.append(Spacer(1, 16))

    # 8. Lab
    story.append(Paragraph("8. Portail Laboratoire", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    for item in [
        "En Attente — Ordres de labo en attente de résultats (patients ayant déjà payé)",
        "Champ de saisie des résultats d'analyse pour chaque ordre",
        "Soumission des résultats — Le patient est automatiquement renvoyé au Médecin",
        "Complétés — Historique des analyses terminées avec résultats",
    ]:
        story.append(Paragraph(f"•  {item}", ParagraphStyle('B', parent=sBody, leftIndent=16)))

    story.append(Spacer(1, 16))

    # 9. Admin
    story.append(Paragraph("9. Portail Administration", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph("Vue d'ensemble complète de la clinique pour le directeur et les administrateurs.", sBody))
    story.append(Spacer(1, 6))
    admin_tabs_desc = [
        ("Tableau de Bord", "Statistiques du jour (patients, revenus, labos en attente, alertes stock), suivi en temps réel des patients, informations de la clinique"),
        ("Patients", "Base de données complète de tous les patients avec ID, nom, sexe, téléphone, assurance, étape"),
        ("Personnel", "Annuaire de tous les 24 agents avec statut d'accès (actif / en attente), statistiques par département"),
        ("Finances", "Mêmes rapports financiers que le portail Pharmacie"),
        ("Notes Conf.", "Accès à toutes les notes confidentielles de tous les médecins"),
        ("Paramètres", "Informations de la clinique (NIF, RCCM), catégories d'assurance, version système"),
    ]
    for tab_name, tab_desc in admin_tabs_desc:
        story.append(Paragraph(f"<b>{tab_name} :</b> {tab_desc}", ParagraphStyle('B', parent=sBody, leftIndent=16, spaceAfter=4)))

    story.append(PageBreak())

    # 10. AI
    story.append(Paragraph("10. Assistant IA intégré", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    story.append(Paragraph(
        "Un bouton circulaire est présent en bas à droite de chaque portail. Il est déplaçable "
        "(cliquer-glisser) pour ne pas gêner l'affichage des données. En cliquant dessus, un "
        "panneau de conversation s'ouvre.", sBody))
    story.append(Spacer(1, 6))
    story.append(Paragraph("L'assistant peut aider le personnel avec des questions médicales, administratives, ou techniques. Il est alimenté par l'IA Gemini et répond en français.", sBody))

    story.append(Spacer(1, 16))

    # 11. Insurance
    story.append(Paragraph("11. Catégories d'assurance", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    
    ins_data = [
        ['Catégorie', 'Description', 'Facturation'],
        ['Régulier', 'Patient sans couverture spéciale', 'Paiement direct à chaque service'],
        ['CSU', 'Couverture Santé Universelle (maternité)', '1 échographie gratuite, suivi grossesse couvert'],
        ['Academia', 'Couverture universitaire/scolaire', 'Facture mensuelle à l\'institution'],
        ['AMC', 'Assurance Maladie Complémentaire', 'Prise en charge partielle ou totale'],
        ['Activa', 'Assurance privée (paiement à l\'usage)', 'Facture mensuelle (1-30), rapport avant le 5'],
    ]
    ins_table = Table(ins_data, colWidths=[70, 195, 205])
    ins_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TEXTCOLOR', (0,1), (-1,-1), TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(ins_table)
    story.append(Spacer(1, 6))
    story.append(Paragraph("La catégorie d'un patient peut être assignée par le Médecin (lors de la consultation) ou modifiée par la Pharmacie (onglet Modifier Patient).", sNote))

    story.append(Spacer(1, 16))

    # 12. Notes
    story.append(Paragraph("12. Notes importantes", sH1))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10))
    notes = [
        "Le système fonctionne dans le navigateur uniquement. Aucune donnée n'est sauvegardée sur un serveur — les données sont réinitialisées à chaque rechargement de la page.",
        "Les données de démonstration sont pré-chargées au démarrage (6 patients, 7 paiements, 2 ordres de labo, 1 note confidentielle, 2 prescriptions) pour faciliter la présentation.",
        "Le fichier hospital-crm.html et le fichier logo.png doivent se trouver dans le même dossier pour que le logo s'affiche correctement.",
        "Les montants sont affichés en Francs Congolais (CDF).",
        "L'inventaire contient 24 médicaments courants au Congo avec leurs fournisseurs locaux (Pharmakina, Novartis, UNICEF, etc.).",
        "Pour une version de production, les données devront être connectées à une base de données (Supabase, Firebase, ou autre) — ce système est une maquette fonctionnelle.",
        "Ce document et les identifiants qu'il contient sont strictement confidentiels.",
    ]
    for i, note in enumerate(notes, 1):
        story.append(Paragraph(f"<b>{i}.</b>  {note}", ParagraphStyle('B', parent=sBody, leftIndent=16, spaceAfter=6)))

    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=12))
    story.append(Paragraph("Clinique The Grace of God — Sauver des vies, gagner des âmes", 
        ParagraphStyle('End', parent=sCenter, fontSize=10, textColor=PRIMARY, fontName='Helvetica-Bold')))
    story.append(Paragraph("Avenue Kola N°204, Ngiri-Ngiri, Kinshasa, RDC", 
        ParagraphStyle('End2', parent=sCenter, fontSize=9, textColor=TEXT_LIGHT)))

    # Build
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f"PDF created: {output_path}")

build_pdf()

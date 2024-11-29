package com.example.cms.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "menus")
@Data
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    @Column(name = "upload_date")
    private LocalDate uploadDate;

    @Lob
    @Column(name = "pdf_data", length = 100000)
    private byte[] pdfData;
}

import { Component, OnInit } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  filePath: string = 'assets/ExMachina HU Application acquiring 16042021.pdf';

  constructor() {}

  ngOnInit(): void {}

  async createPdf() {
    try {
      const formBytes = await fetch(this.filePath).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(formBytes);

      const filedNames = pdfDoc
        .getForm()
        .getFields()
        .map((f) => f.getName());

      console.log(filedNames);

      const form = pdfDoc.getForm();

      filedNames.forEach((fieldName) => {
        try {
          form.getTextField(fieldName).setText(fieldName.toString());
        } catch (error) {
          //console.log(error);
        }
      });

      /* // checkoboxok:
      form.getCheckBox('Check Box1').check(); */

      // Letoltes
      const pdfBytes = await pdfDoc.save();
      this.saveFile(pdfBytes);
    } catch (error) {
      console.log(error);
    }
  }

  saveFile(file: Uint8Array) {
    const blob = new Blob([file], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}

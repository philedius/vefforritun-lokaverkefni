# Dagskrá: Lokaverkefni í vefforritun

### Uppsetning
Það eina sem þarf að gera er að gera: "npm install" og svo "gulp" til að keyra.
### Ferlið
Ákvað að gera sjónvarpsdagskrá með gögnum frá apis.is vegna þess að mig langaði að gera vefsíðu sem myndi hafa eitthvað notagildi annað en sem verkefnaskil, og fannst eins og að sjónvarpsdagskrá væri raunhæft markmið.

Stefnan var að hafa einfalda og augljósa virkni og þægilegt notendaviðmót. Ákvað því að notast við Bootstrap þar sem það býður upp á góðan CSS grunn og hefur einnig ýmsa Javascript virkni. JQuery var nauðsynlegt fyrir apis.is tengingu en einnig mjög hentugt í að setja upp gögnin á síðunni.

Ég vildi aðeins breyta til frá vanilla Bootstrap útlitinu og ákvað því að nota SASS, vegna möguleikans til að nota breytur.

Notaðist svo við gulp fyrir SASS processing, JSHint og Browser-Sync. 

Eftir uppsetningu á virkni frontendans og útlits notaðist ég við Express fyrir bakendann. Þar sem vefsíðan er á aðeins einni síðu hafði ég virknina mjög barebones.

### Hvað hefði mátt fara betur
Byrjaði verkefnið af ákafa frekar snemma en setti það svo á hilluna þangað til svona þremur dögum fyrir skil. Þá átti ég eftir að setja upp Express og deploy-a síðuna, og hafði almennt lítinn tíma vegna annarra verkefna og próflærdóms. Þannig að ég hefði mátt skipuleggja vinnutíma betur. Svo eftir að ég byrjaði að vinna með Express fór ég að fikta við gulp til að láta það virka með Express, en lenti bara í veseni, og því virkar save->reload browser ekki lengur.

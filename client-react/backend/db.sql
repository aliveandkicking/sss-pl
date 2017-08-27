BEGIN
	DECLARE result MEDIUMTEXT;
    IF (operation = 'save') THEN
		UPDATE `state` SET value=body, date=CURRENT_TIMESTAMP;
    	RETURN '1';
    ELSEIF (operation = 'load') THEN 
        SELECT value INTO result FROM `state`;
        RETURN result;
    END IF;
	RETURN 'unknown operation';

  